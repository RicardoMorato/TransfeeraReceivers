import { NotFoundError, ServerError } from "@/presentation/errors";
import { makeSut } from "./testUtils";

describe("deleteOneReceiverController", () => {
  const request = {
    params: {
      id: "valid_id",
    },
  };

  it("should call delete receivers correctly", async () => {
    const { sut, deleteReceiverStub } = makeSut();
    const deleteReceiversSpy = jest.spyOn(deleteReceiverStub, "deleteOne");

    await sut.handle(request);

    expect(deleteReceiversSpy).toHaveBeenCalledTimes(1);
  });

  it("should return 500 if delete receivers throws", async () => {
    const { sut, deleteReceiverStub } = makeSut();
    jest.spyOn(deleteReceiverStub, "deleteOne").mockImplementationOnce(() => {
      throw new Error();
    });

    const response = await sut.handle(request);

    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual(new ServerError(""));
  });

  it("should return 404 if list receivers does not find ID", async () => {
    const { sut, deleteReceiverStub } = makeSut();
    jest.spyOn(deleteReceiverStub, "deleteOne").mockImplementationOnce(() => {
      return null;
    });

    const response = await sut.handle(request);

    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual(new NotFoundError());
  });

  it("should return 204 if no error occurs", async () => {
    const { sut } = makeSut();

    const response = await sut.handle(request);

    expect(response.statusCode).toBe(204);
    expect(response.body).toBeFalsy();
  });
});
