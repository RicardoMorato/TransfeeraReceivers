import { ServerError } from "@/presentation/errors";
import { makeSut, request } from "./testUtils";

describe("updateReceiverController", () => {
  it("should call validator adapter with correct values", async () => {
    const { sut, validatorAdapterStub } = makeSut();
    const validateSpy = jest.spyOn(validatorAdapterStub, "validateUpdate");

    await sut.handle(request);

    expect(validateSpy).toHaveBeenCalledWith(request);
  });

  it("should return 500 if validator adapter throws", async () => {
    const { sut, validatorAdapterStub } = makeSut();
    jest
      .spyOn(validatorAdapterStub, "validateUpdate")
      .mockImplementationOnce(() => {
        throw new Error();
      });

    const response = await sut.handle(request);

    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual(new ServerError(""));
  });

  it("should call update receiver with correct values", async () => {
    const { sut, updateReceiverStub } = makeSut();
    const updateReceiverSpy = jest.spyOn(updateReceiverStub, "update");

    await sut.handle(request);

    expect(updateReceiverSpy).toHaveBeenCalledWith(request.body);
  });

  it("should return 500 if add receiver throws", async () => {
    const { sut, updateReceiverStub } = makeSut();
    jest.spyOn(updateReceiverStub, "update").mockImplementationOnce(() => {
      throw new Error();
    });

    const response = await sut.handle(request);

    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual(new ServerError(""));
  });

  it("should return 204 if valid data is provided", async () => {
    const { sut } = makeSut();

    const response = await sut.handle(request);

    expect(response.statusCode).toBe(204);
    expect(response.body).toBeFalsy();
  });
});
