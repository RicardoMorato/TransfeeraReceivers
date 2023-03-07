import { NotFoundError, ServerError } from "@/presentation/errors";
import { fakeReceiver, makeSut } from "./testUtils";

describe("listOneReceiverController", () => {
  const request = {
    params: {
      id: "valid_id",
    },
  };

  it("should call list receivers correctly", async () => {
    const { sut, listReceiversStub } = makeSut();
    const listReceiversSpy = jest.spyOn(listReceiversStub, "listOne");

    await sut.handle(request);

    expect(listReceiversSpy).toHaveBeenCalledTimes(1);
  });

  it("should return 500 if list receivers throws", async () => {
    const { sut, listReceiversStub } = makeSut();
    jest.spyOn(listReceiversStub, "listOne").mockImplementationOnce(() => {
      throw new Error();
    });

    const response = await sut.handle(request);

    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual(new ServerError(""));
  });

  it("should return 404 if list receivers does not find ID", async () => {
    const { sut, listReceiversStub } = makeSut();
    jest.spyOn(listReceiversStub, "listOne").mockImplementationOnce(() => {
      return null;
    });

    const response = await sut.handle(request);

    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual(new NotFoundError());
  });

  it("should return 200 if no error occurs", async () => {
    const { sut } = makeSut();

    const response = await sut.handle(request);

    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual({
      data: fakeReceiver,
    });
  });
});
