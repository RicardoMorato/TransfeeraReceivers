import Cryptr from "cryptr";
import { Encrypter } from "@/data/protocols/encrypter";
import { getEnvVariables } from "@/main/config";

const {
  APP: { ENCRYPTION_SECRET_KEY },
} = getEnvVariables();

export class CryptrAdapter implements Encrypter {
  private readonly cryptr: Cryptr;
  private readonly encryptionSecretKey: string | null;

  constructor(encryptionSecretKey?: string | null) {
    this.encryptionSecretKey = encryptionSecretKey;

    this.cryptr = new Cryptr(this.encryptionSecretKey || ENCRYPTION_SECRET_KEY);
  }

  encrypt(value: string): Promise<string> {
    const encryptedValue = this.cryptr.encrypt(value);

    return new Promise((resolve) => resolve(encryptedValue));
  }

  decrypt(encryptedString: string): Promise<String> {
    const decryptedValue = this.cryptr.decrypt(encryptedString);

    return new Promise((resolve) => resolve(decryptedValue));
  }
}
