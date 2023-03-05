import Cryptr from "cryptr";
import dotenv from "dotenv";
import { Encrypter } from "@/data/protocols/encrypter";

dotenv.config();

export class CryptrAdapter implements Encrypter {
  private readonly cryptr: Cryptr;
  private readonly encryptionSecretKey: string | null;

  constructor(encryptionSecretKey: string | null) {
    this.encryptionSecretKey = encryptionSecretKey;

    this.cryptr = new Cryptr(
      process.env.ENCRYPTION_SECRECT_KEY || this.encryptionSecretKey
    );
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
