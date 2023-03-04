import {
  Encrypter,
  AddReceiverModel,
  ReceiverModel,
  ReceiverRepository,
} from "../dbHandlerAddReceiverProtocols";
import { DbHandlerAddReceiver } from "../dbHandlerAddReceiver";

interface SutTypes {
  sut: DbHandlerAddReceiver;
  encrypterStub: Encrypter;
  ReceiverRepositoryStub: ReceiverRepository;
}

export const makeSut = (): SutTypes => {
  const encrypterStub = makeEncrypter();
  const ReceiverRepositoryStub = makeReceiverRepository();
  const sut = new DbHandlerAddReceiver(encrypterStub, ReceiverRepositoryStub);

  return {
    sut,
    encrypterStub,
    ReceiverRepositoryStub,
  };
};

const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt(value: string): Promise<string> {
      return new Promise((resolve) => resolve("encrypted_value"));
    }
  }

  return new EncrypterStub();
};

const makeReceiverRepository = (): ReceiverRepository => {
  class ReceiverRepositoryStub implements ReceiverRepository {
    add(receiver: AddReceiverModel): Promise<ReceiverModel> {
      const fakeReceiver: ReceiverModel = {
        ...receiver,
        id: "valid_id",
        status: "RASCUNHO",
      };

      return new Promise((resolve) => resolve(fakeReceiver));
    }
  }

  return new ReceiverRepositoryStub();
};
