import { makeSut } from "./testUtils";

describe("dbHandlerAddReceiver use case", () => {
  it("should call Encrypter with correct fields", async () => {
    const { sut, encrypterStub } = makeSut();
    const encryptSpy = jest.spyOn(encrypterStub, "encrypt");

    const receiverData = {
      name: "valid_name",
      email: "valid_email",
      document: "11111111111",
      pixKeyType: "EMAIL",
      pixKey: "valid_email",
    };

    await sut.add(receiverData);

    expect(encryptSpy).toHaveBeenCalledWith("valid_email");
    expect(encryptSpy).toHaveBeenCalledWith("11111111111");
    expect(encryptSpy).toHaveBeenCalledWith("EMAIL");
    expect(encryptSpy).toHaveBeenCalledWith("valid_email");
  });
});
