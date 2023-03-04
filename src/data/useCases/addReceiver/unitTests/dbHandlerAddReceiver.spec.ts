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
    const { sut, addReceiverRepositoryStub } = makeSut();
    const repositorySpy = jest.spyOn(addReceiverRepositoryStub, "add");

    await sut.add(receiverData);

    expect(repositorySpy).toHaveBeenCalledWith(receiverDataEncrypted);
  });
});
