import { makeSut } from "./testUtils";

describe("dbHandlerAddReceiver use case", () => {
  const receiverData = {
    name: "valid_name",
    email: "valid_email",
    document: "11111111111",
    pixKeyType: "EMAIL",
    pixKey: "valid_email",
  };

  const receiverDataEncrypted = {
    name: "valid_name",
    email: "encrypted_value",
    document: "encrypted_value",
    pixKeyType: "encrypted_value",
    pixKey: "encrypted_value",
  };

  it("should call Encrypter with correct fields", async () => {
    const { sut, encrypterStub } = makeSut();
    const encryptSpy = jest.spyOn(encrypterStub, "encrypt");

    await sut.add(receiverData);

    expect(encryptSpy).toHaveBeenCalledWith(receiverData.email);
    expect(encryptSpy).toHaveBeenCalledWith(receiverData.document);
    expect(encryptSpy).toHaveBeenCalledWith(receiverData.pixKeyType);
    expect(encryptSpy).toHaveBeenCalledWith(receiverData.pixKey);
  });

  it("should call AddReceiverRepository with correct values", async () => {
    const { sut, ReceiverRepositoryStub } = makeSut();
    const repositorySpy = jest.spyOn(ReceiverRepositoryStub, "add");

    await sut.add(receiverData);

    expect(repositorySpy).toHaveBeenCalledWith(receiverDataEncrypted);
  });

  it("should throw if Encrypter throws", async () => {
    const { sut, encrypterStub } = makeSut();
    jest
      .spyOn(encrypterStub, "encrypt")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      );

    const promise = sut.add(receiverData);

    await expect(promise).rejects.toThrow();
  });

  it("should throw if AddReceiverRepository throws", async () => {
    const { sut, ReceiverRepositoryStub } = makeSut();
    jest
      .spyOn(ReceiverRepositoryStub, "add")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      );

    const promise = sut.add(receiverData);

    await expect(promise).rejects.toThrow();
  });

  it("should return a receiver on success", async () => {
    const { sut } = makeSut();

    const receiver = await sut.add(receiverData);

    expect(receiver).toEqual({
      ...receiverDataEncrypted,
      status: "RASCUNHO",
      id: "valid_id",
    });
  });
});
