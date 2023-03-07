import { makeSut, receivers } from "./testUtils";

describe("dbHandlerDeleteReceivers - Delete one", () => {
  it("should call delete receiver repository only once", async () => {
    const { sut, deleteReceiverRepositoryStub } = makeSut();
    const repositorySpy = jest.spyOn(deleteReceiverRepositoryStub, "deleteOne");

    await sut.deleteOne("valid_id");

    expect(repositorySpy).toHaveBeenCalledTimes(1);
  });

  it("should throw if DeleteReceiversRepository throws", async () => {
    const { sut, deleteReceiverRepositoryStub } = makeSut();
    jest
      .spyOn(deleteReceiverRepositoryStub, "deleteOne")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      );

    const promise = sut.deleteOne("valid_id");

    await expect(promise).rejects.toThrow();
  });

  it("should return the deleted receiver on success", async () => {
    const { sut } = makeSut();

    const result = await sut.deleteOne("valid_test_id");

    expect(result).toStrictEqual(receivers[0]);
  });
});

describe("dbHandlerDeleteReceivers - Delete many", () => {
  const ids = ["valid_id", "new_valid_id", "valid_test_id"];

  it("should call delete receiver repository 3 times", async () => {
    const { sut, deleteReceiverRepositoryStub } = makeSut();
    const repositorySpy = jest.spyOn(deleteReceiverRepositoryStub, "deleteOne");

    await sut.deleteMany(ids);

    expect(repositorySpy).toHaveBeenCalledTimes(3);
  });

  it("should throw if DeleteReceiversRepository throws", async () => {
    const { sut, deleteReceiverRepositoryStub } = makeSut();
    jest
      .spyOn(deleteReceiverRepositoryStub, "deleteOne")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      );

    const promise = sut.deleteMany(ids);

    await expect(promise).rejects.toThrow();
  });

  it("should return the deleted receivers on success", async () => {
    const { sut } = makeSut();

    const result = await sut.deleteMany([ids[0], ids[1]]);

    expect(result).toBeInstanceOf(Array);
    expect(result).toHaveLength(2);
  });
});
