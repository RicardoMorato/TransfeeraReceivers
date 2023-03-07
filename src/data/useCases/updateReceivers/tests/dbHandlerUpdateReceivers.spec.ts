import { Status } from "@/domain/models";
import { makeSut } from "./testUtils";

describe("dbHandlerUpdateReceiver use case", () => {
  const receiverData = {
    id: "valid_id",
    name: "valid_name",
    email: "valid_email",
    document: "11111111111",
    pixKeyType: "EMAIL",
    pixKey: "valid_email",
    status: "RASCUNHO" as Status,
  };

  const receiverDataEncrypted = {
    id: "valid_id",
    name: "valid_name",
    email: "encrypted_value",
    document: "encrypted_value",
    pixKeyType: "encrypted_value",
    pixKey: "encrypted_value",
    status: "RASCUNHO",
  };

  it("should call Encrypter with correct fields", async () => {
    const { sut, encrypterStub } = makeSut();
    const encryptSpy = jest.spyOn(encrypterStub, "encrypt");

    await sut.update(receiverData);

    expect(encryptSpy).toHaveBeenCalledWith(receiverData.email);
    expect(encryptSpy).toHaveBeenCalledWith(receiverData.document);
    expect(encryptSpy).toHaveBeenCalledWith(receiverData.pixKeyType);
    expect(encryptSpy).toHaveBeenCalledWith(receiverData.pixKey);
  });

  it("should call UpdateReceiverRepository with correct values", async () => {
    const { sut, updateReceiverRepositoryStub } = makeSut();
    const repositorySpy = jest.spyOn(updateReceiverRepositoryStub, "update");

    await sut.update(receiverData);

    expect(repositorySpy).toHaveBeenCalledWith(receiverDataEncrypted);
  });

  it("should throw if Encrypter throws", async () => {
    const { sut, encrypterStub } = makeSut();
    jest
      .spyOn(encrypterStub, "encrypt")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      );

    const promise = sut.update(receiverData);

    await expect(promise).rejects.toThrow();
  });

  it("should throw if AddReceiverRepository throws", async () => {
    const { sut, updateReceiverRepositoryStub } = makeSut();
    jest
      .spyOn(updateReceiverRepositoryStub, "update")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      );

    const promise = sut.update(receiverData);

    await expect(promise).rejects.toThrow();
  });

  it("should return a receiver on success", async () => {
    const { sut } = makeSut();

    const receiver = await sut.update(receiverData);

    expect(receiver).toEqual({
      document: "encrypted_value",
      email: "encrypted_value",
      id: "valid_id",
      name: "valid_name",
      pixKey: "encrypted_value",
      pixKeyType: "encrypted_value",
      status: "RASCUNHO",
    });
  });
});
