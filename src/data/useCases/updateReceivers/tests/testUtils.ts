import { DbHandlerUpdateReceivers } from "../dbHandlerUpdateReceivers";
import { Encrypter } from "@/data/protocols/encrypter";
import { ReceiverModel, UpdateReceiverRepository } from "@/data/useCases";
import { UpdateReceiverModel } from "@/domain/useCases/updateReceiver";

interface SutTypes {
  sut: DbHandlerUpdateReceivers;
  encrypterStub: Encrypter;
  updateReceiverRepositoryStub: UpdateReceiverRepository;
}

export const makeSut = (): SutTypes => {
  const encrypterStub = makeEncrypter();
  const updateReceiverRepositoryStub = makeReceiverRepository();
  const sut = new DbHandlerUpdateReceivers(
    encrypterStub,
    updateReceiverRepositoryStub
  );

  return {
    sut,
    encrypterStub,
    updateReceiverRepositoryStub,
  };
};

const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    decrypt(encryptedString: string): Promise<String> {
      throw new Error("Method not implemented.");
    }
    async encrypt(value: string): Promise<string> {
      return new Promise((resolve) => resolve("encrypted_value"));
    }
  }

  return new EncrypterStub();
};

const makeReceiverRepository = (): UpdateReceiverRepository => {
  class ReceiverRepositoryStub implements UpdateReceiverRepository {
    update(receiver: UpdateReceiverModel): Promise<ReceiverModel> {
      return new Promise((resolve) => resolve({ ...receiver }));
    }
  }

  return new ReceiverRepositoryStub();
};
