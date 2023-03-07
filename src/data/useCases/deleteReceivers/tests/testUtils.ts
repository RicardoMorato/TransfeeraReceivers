import { DeleteReceiverRepository } from "@/data/useCases";
import { ReceiverModel } from "@/domain/models";
import { ObjectId } from "mongodb";
import { DbHandlerDeleteReceivers } from "../dbHandlerDeleteReceivers";

interface SutTypes {
  sut: DbHandlerDeleteReceivers;
  deleteReceiverRepositoryStub: DeleteReceiverRepository;
}

export const makeSut = (): SutTypes => {
  const deleteReceiverRepositoryStub = makeReceiverRepository();
  const sut = new DbHandlerDeleteReceivers(deleteReceiverRepositoryStub);

  return {
    sut,
    deleteReceiverRepositoryStub,
  };
};

const makeReceiverRepository = (): DeleteReceiverRepository => {
  class ReceiverRepositoryStub implements DeleteReceiverRepository {
    deleteOne(id: String | ObjectId): Promise<ReceiverModel> {
      const receiverFound = receivers.find((receiver) => receiver.id === id);

      return new Promise((resolve) => resolve(receiverFound));
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
    id: "new_valid_id",
    status: "VALIDADO",
    name: "valid_name",
    email: "valid_email",
    pixKey: "valid_email",
    pixKeyType: "EMAIL",
    document: "valid_document",
  },
];
