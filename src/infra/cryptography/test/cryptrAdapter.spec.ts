import Cryptr from "cryptr";
import { Encrypter } from "@/data/protocols/encrypter";
import { CryptrAdapter } from "../cryptrAdapter";

const makeSut = (): Encrypter => {
  const encryptionSecretKey = "myTotallySecretKey";

  return new CryptrAdapter(encryptionSecretKey);
};

describe("CryptrAdapter", () => {
  it("should encrypt a value successfully", async () => {
    const sut = makeSut();

    const value = "bacon";
    const encryptedString = await sut.encrypt(value);

    expect(encryptedString).not.toBe(value);
  });

  it("should decrypt a value successfully", async () => {
    const sut = makeSut();

    const value = "bacon";
    const encryptedString = await sut.encrypt(value);
    const decryptedString = await sut.decrypt(encryptedString);

    expect(decryptedString).not.toBe(encryptedString);
    expect(decryptedString).toBe(value);
  });
});
