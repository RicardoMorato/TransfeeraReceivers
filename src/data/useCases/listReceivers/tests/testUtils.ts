import { Encrypter } from "@/data/protocols/encrypter";
import { ReceiverModel } from "@/domain/models";
import { ListReceiverRepository } from "@/data/useCases";
import { DbHandlerListReceivers } from "../dbHandlerListReceivers";
import { ObjectId } from "mongodb";

interface SutTypes {
  sut: DbHandlerListReceivers;
  encrypterStub: Encrypter;
  listReceiverRepositoryStub: ListReceiverRepository;
}

export const makeSut = (): SutTypes => {
  const encrypterStub = makeEncrypter();
  const listReceiverRepositoryStub = makeReceiverRepository();
  const sut = new DbHandlerListReceivers(
    encrypterStub,
    listReceiverRepositoryStub
  );

  return {
    sut,
    encrypterStub,
    listReceiverRepositoryStub,
  };
};

const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    decrypt(encryptedString: string): Promise<String> {
      return new Promise((resolve) => resolve("decrypted_value"));
    }
    async encrypt(value: string): Promise<string> {
      return new Promise((resolve) => resolve("encrypted_value"));
    }
  }

  return new EncrypterStub();
};

const makeReceiverRepository = (): ListReceiverRepository => {
  class ReceiverRepositoryStub implements ListReceiverRepository {
    listBy(value: string): Promise<ReceiverModel[]> {
      const filteredValues = receivers.filter((receiver) => {
        for (const v of Object.values(receiver)) {
          if (v === value) return receiver;
        }
      });
      return new Promise((resolve) => resolve(filteredValues));
    }
    list(): Promise<ReceiverModel[]> {
      return new Promise((resolve) => resolve(receivers));
    }

    listOne(id: String | ObjectId): Promise<ReceiverModel> {
      const found = receivers.filter((receiver) => receiver.id === id);

      if (found.length) return new Promise((resolve) => resolve(found[0]));
      else return null;
    }
  }

  return new ReceiverRepositoryStub();
};

export const receivers: ReceiverModel[] = [
  {
    id: "valid_test_id",
    status: "RASCUNHO",
    name: "valid_name",
    email: "valid_email",
    pixKey: "valid_email",
    pixKeyType: "EMAIL",
    document: "valid_document",
  },
  {
    id: "valid_id",
    status: "VALIDADO",
    name: "valid_name",
    email: "valid_email",
    pixKey: "valid_email",
    pixKeyType: "EMAIL",
    document: "valid_document",
  },
  {
    id: "valid_id",
    status: "VALIDADO",
    name: "valid_name",
    email: "valid_email",
    pixKey: "valid_email",
    pixKeyType: "EMAIL",
    document: "valid_document",
  },
  {
    id: "valid_id",
    status: "VALIDADO",
    name: "valid_name",
    email: "valid_email",
    pixKey: "valid_email",
    pixKeyType: "EMAIL",
    document: "valid_document",
  },
  {
    id: "valid_id",
    status: "VALIDADO",
    name: "valid_name",
    email: "valid_email",
    pixKey: "valid_email",
    pixKeyType: "EMAIL",
    document: "valid_document",
  },
  {
    id: "valid_id",
    status: "VALIDADO",
    name: "valid_name",
    email: "valid_email",
    pixKey: "valid_email",
    pixKeyType: "EMAIL",
    document: "valid_document",
  },
  {
    id: "valid_id",
    status: "VALIDADO",
    name: "valid_name",
    email: "valid_email",
    pixKey: "valid_email",
    pixKeyType: "EMAIL",
    document: "valid_document",
  },
  {
    id: "valid_id",
    status: "VALIDADO",
    name: "valid_name",
    email: "valid_email",
    pixKey: "valid_email",
    pixKeyType: "EMAIL",
    document: "valid_document",
  },
  {
    id: "valid_id",
    status: "VALIDADO",
    name: "valid_name",
    email: "valid_email",
    pixKey: "valid_email",
    pixKeyType: "EMAIL",
    document: "valid_document",
  },
  {
    id: "valid_id",
    status: "VALIDADO",
    name: "valid_name",
    email: "valid_email",
    pixKey: "valid_email",
    pixKeyType: "EMAIL",
    document: "valid_document",
  },
  {
    id: "valid_id",
    status: "VALIDADO",
    name: "valid_name",
    email: "valid_email",
    pixKey: "valid_email",
    pixKeyType: "EMAIL",
    document: "valid_document",
  },
  {
    id: "valid_id",
    status: "VALIDADO",
    name: "valid_name",
    email: "valid_email",
    pixKey: "valid_email",
    pixKeyType: "EMAIL",
    document: "valid_document",
  },
  {
    id: "valid_id",
    status: "VALIDADO",
    name: "valid_name",
    email: "valid_email",
    pixKey: "valid_email",
    pixKeyType: "EMAIL",
    document: "valid_document",
  },
];
