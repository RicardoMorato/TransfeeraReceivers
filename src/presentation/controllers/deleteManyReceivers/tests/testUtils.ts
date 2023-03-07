import { ReceiverModel } from "@/domain/models";
import { DeleteReceivers } from "@/domain/useCases/deleteReceiver";
import { ObjectId } from "mongodb";
import { DeleteManyReceiversController } from "../deleteManyReceivers";

interface SutTypes {
  sut: DeleteManyReceiversController;
  deleteReceiverStub: DeleteReceivers;
}

export const makeSut = (): SutTypes => {
  const deleteReceiverStub = makeDeleteReceivers();
  const sut = new DeleteManyReceiversController(deleteReceiverStub);

  return {
    sut,
    deleteReceiverStub,
  };
};

const makeDeleteReceivers = (): DeleteReceivers => {
  class DeleteReceiversStub implements DeleteReceivers {
    deleteOne(id: String | ObjectId): Promise<ReceiverModel> {
      const receiverFound = receivers.find((receiver) => receiver.id === id);

      return new Promise((resolve) => resolve(receiverFound));
    }
    async deleteMany(ids: String[] | ObjectId[]): Promise<String[]> {
      const results: string[] = [];

      for (const id of ids) {
        const result = await this.deleteOne(id);

        results.push(result.id as string);
      }

      return results;
    }
  }

  return new DeleteReceiversStub();
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
