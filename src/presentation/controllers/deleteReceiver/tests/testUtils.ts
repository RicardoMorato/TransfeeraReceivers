import { ReceiverModel, Status } from "@/domain/models";
import { DeleteReceivers } from "@/domain/useCases/deleteReceiver";
import { ObjectId } from "mongodb";
import { DeleteOneReceiverController } from "../deleteReceiver";

interface SutTypes {
  sut: DeleteOneReceiverController;
  deleteReceiverStub: DeleteReceivers;
}

export const fakeReceiver = {
  id: "valid_id",
  name: "valid_name",
  email: "VALID-EMAIL@MAIL.COM",
  document: "11111111111",
  pixKeyType: "EMAIL",
  pixKey: "VALID-EMAIL@MAIL.COM",
  status: "RASCUNHO" as Status,
};

export const makeSut = (): SutTypes => {
  const deleteReceiverStub = makeDeleteReceivers();
  const sut = new DeleteOneReceiverController(deleteReceiverStub);

  return {
    sut,
    deleteReceiverStub,
  };
};

const makeDeleteReceivers = (): DeleteReceivers => {
  class DeleteReceiversStub implements DeleteReceivers {
    deleteOne(id: String | ObjectId): Promise<ReceiverModel> {
      return new Promise((resolve) => resolve(fakeReceiver));
    }
    deleteMany(ids: String[] | ObjectId[]): Promise<ReceiverModel[]> {
      throw new Error("Method not implemented.");
    }
  }

  return new DeleteReceiversStub();
};
