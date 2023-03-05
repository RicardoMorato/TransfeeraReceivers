import { ServerError } from "@/presentation/errors";
import { makeSut } from "./testUtils";

describe("createReceiverController", () => {
  const receiverData = {
    name: "valid_name",
    email: "VALID-EMAIL@MAIL.COM",
    document: "11111111111",
    pixKeyType: "EMAIL",
    pixKey: "VALID-EMAIL@MAIL.COM",
  };

  const request = {
    body: receiverData,
  };

  it("should call validator adapter with correct values", async () => {
    const { sut, validatorAdapterStub } = makeSut();
    const validateSpy = jest.spyOn(validatorAdapterStub, "validate");

    await sut.handle(request);

    expect(validateSpy).toHaveBeenCalledWith(request);
  });

  it("should return 500 if validator adapter throws", async () => {
    const { sut, validatorAdapterStub } = makeSut();
    jest.spyOn(validatorAdapterStub, "validate").mockImplementationOnce(() => {
      throw new Error();
    });

    const response = await sut.handle(request);

    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual(new ServerError(""));
  });

  it("should call add receiver with correct values", async () => {
    const { sut, addReceiverStub } = makeSut();
    const addReceiverSpy = jest.spyOn(addReceiverStub, "add");

    await sut.handle(request);

    expect(addReceiverSpy).toHaveBeenCalledWith(request.body);
  });

  it("should return 500 if add receiver throws", async () => {
    const { sut, addReceiverStub } = makeSut();
    jest.spyOn(addReceiverStub, "add").mockImplementationOnce(() => {
      throw new Error();
    });

    const response = await sut.handle(request);

    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual(new ServerError(""));
  });

  it("should return 200 if valid data is provided", async () => {
    const { sut } = makeSut();

    const response = await sut.handle(request);

    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({
      message: "Receiver created with id: valid_id",
      id: "valid_id",
    });
  });
});
