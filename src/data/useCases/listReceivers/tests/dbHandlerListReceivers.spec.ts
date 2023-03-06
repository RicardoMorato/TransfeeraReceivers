import { makeSut, receivers } from "./testUtils";

describe("dbHandlerListReceivers use case", () => {
  it("should call list receiver repository only once", async () => {
    const { sut, listReceiverRepositoryStub } = makeSut();
    const repositorySpy = jest.spyOn(listReceiverRepositoryStub, "list");

    await sut.list(1);

    expect(repositorySpy).toHaveBeenCalledTimes(1);
  });

  it("should call Encrypter correctly", async () => {
    const { sut, encrypterStub } = makeSut();

    const decryptSpy = jest.spyOn(encrypterStub, "decrypt");

    await sut.list(1);

    expect(decryptSpy).toHaveBeenCalledTimes(receivers.slice(0, 10).length * 4);
  });

  it("should throw if Encrypter throws", async () => {
    const { sut, encrypterStub } = makeSut();
    jest
      .spyOn(encrypterStub, "decrypt")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      );

    const promise = sut.list(1);

    await expect(promise).rejects.toThrow();
  });

  it("should throw if AddReceiverRepository throws", async () => {
    const { sut, listReceiverRepositoryStub } = makeSut();
    jest
      .spyOn(listReceiverRepositoryStub, "list")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      );

    const promise = sut.list(1);

    await expect(promise).rejects.toThrow();
  });

  it("should return a paginated result on success", async () => {
    const { sut } = makeSut();

    const result = await sut.list(1);

    expect(result.data.length).toBe(10);
    expect(result.totalPages).toBe(2);
  });
});
