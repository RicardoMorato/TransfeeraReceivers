import { makeSut, receivers } from "./testUtils";

describe("dbHandlerListReceivers - List all", () => {
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

  it("should throw if ListReceiversRepository throws", async () => {
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

describe("dbHandlerListReceivers - List by", () => {
  it("should call list by repository only once", async () => {
    const { sut, listReceiverRepositoryStub } = makeSut();
    const repositorySpy = jest.spyOn(listReceiverRepositoryStub, "listBy");

    await sut.listBy("status", "RASCUNHO");

    expect(repositorySpy).toHaveBeenCalledTimes(1);
  });

  it("should throw if ListReceiversRepository throws", async () => {
    const { sut, listReceiverRepositoryStub } = makeSut();
    jest
      .spyOn(listReceiverRepositoryStub, "listBy")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      );

    const promise = sut.listBy("status", "RASCUNHO");

    await expect(promise).rejects.toThrow();
  });

  it("should return result a set of receivers following the correct condition", async () => {
    const { sut } = makeSut();

    const result = await sut.listBy("status", "RASCUNHO");

    expect(result).toBeInstanceOf(Array);
    expect(result).toHaveLength(1);
  });
});
