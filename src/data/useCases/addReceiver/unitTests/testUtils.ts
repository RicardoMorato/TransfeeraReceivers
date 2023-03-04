import {
  Encrypter,
  ReceiverModel,
  AddReceiverRepository,
} from "../dbHandlerAddReceiverProtocols";
import { DbHandlerAddReceiver } from "../dbHandlerAddReceiver";

interface SutTypes {
  sut: DbHandlerAddReceiver;
  encrypterStub: Encrypter;
  addReceiverRepositoryStub: AddReceiverRepository;
}

export const makeSut = (): SutTypes => {
  const encrypterStub = makeEncrypter();
  const addReceiverRepositoryStub = makeAddReceiverRepository();
  const sut = new DbHandlerAddReceiver(
    encrypterStub,
    addReceiverRepositoryStub
  );

  return {
    sut,
    encrypterStub,
    addReceiverRepositoryStub,
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

const makeAddReceiverRepository = (): AddReceiverRepository => {
  class AddReceiverRepositoryStub implements AddReceiverRepository {
    add(): Promise<ReceiverModel> {
      const fakeReceiver: ReceiverModel = {
        id: "valid_id",
        name: "valid_name",
        email: "valid_email",
        document: "11111111111",
        pixKeyType: "EMAIL",
        pixKey: "valid_email",
        status: "RASCUNHO",
      };

      return new Promise((resolve) => resolve(fakeReceiver));
    }
  }

  return new AddReceiverRepositoryStub();
};
