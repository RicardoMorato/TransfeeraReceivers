import { ServerError } from "@/presentation/errors";
import { makeSut, fakeListOfReceivers } from "./testUtils";

describe("listAllReceiversController", () => {
  it("should call list receivers correctly", async () => {
    const { sut, listReceiversStub } = makeSut();
    const listReceiversSpy = jest.spyOn(listReceiversStub, "list");

    await sut.handle();

    expect(listReceiversSpy).toHaveBeenCalledTimes(1);
  });

  it("should return 500 if list receivers throws", async () => {
    const { sut, listReceiversStub } = makeSut();
    jest.spyOn(listReceiversStub, "list").mockImplementationOnce(() => {
      throw new Error();
    });

    const response = await sut.handle();

    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual(new ServerError(""));
  });

  it("should return 200 if no error occurs", async () => {
    const { sut } = makeSut();

    const response = await sut.handle();

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ data: fakeListOfReceivers });
  });
});
