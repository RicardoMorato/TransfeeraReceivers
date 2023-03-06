import { Encrypter } from "@/data/useCases";

export class DumbEncrypterAdapter implements Encrypter {
  encrypt(value: string): Promise<string> {
    return new Promise((resolve) => resolve(value));
  }
  decrypt(value: string): Promise<String> {
    return new Promise((resolve) => resolve(value));
  }
}
