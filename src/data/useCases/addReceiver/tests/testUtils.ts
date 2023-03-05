import {
  Encrypter,
  AddReceiverModel,
  ReceiverModel,
  AddReceiverRepository,
} from "../dbHandlerAddReceiverProtocols";
import { DbHandlerAddReceiver } from "../dbHandlerAddReceiver";
import { InsertOneResult, ObjectId } from "mongodb";

interface SutTypes {
  sut: DbHandlerAddReceiver;
  encrypterStub: Encrypter;
  addReceiverRepositoryStub: AddReceiverRepository;
}

export const makeSut = (): SutTypes => {
  const encrypterStub = makeEncrypter();
  const addReceiverRepositoryStub = makeReceiverRepository();
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
    decrypt(encryptedString: string): Promise<String> {
      throw new Error("Method not implemented.");
    }
    async encrypt(value: string): Promise<string> {
      return new Promise((resolve) => resolve("encrypted_value"));
    }
  }

  return new EncrypterStub();
};

const makeReceiverRepository = (): AddReceiverRepository => {
  class ReceiverRepositoryStub implements AddReceiverRepository {
    add(receiver: AddReceiverModel): Promise<InsertOneResult<Document>> {
      const fakeReceiver = {
        acknowledged: true,
        insertedId: "valid_id" as unknown as ObjectId,
      };

      return new Promise((resolve) => resolve(fakeReceiver));
    }
  }

  return new ReceiverRepositoryStub();
};
