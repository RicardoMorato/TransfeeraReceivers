import { ListAllReceiversController } from "@/presentation/controllers";
import { ReceiverModel } from "@/domain/models/Receiver";
import { ListReceivers } from "@/domain/useCases/listReceivers";
import { ObjectId } from "mongodb";

interface SutTypes {
  sut: ListAllReceiversController;
  listReceiversStub: ListReceivers;
}

export const fakeListOfReceivers: ReceiverModel[] = [
  {
    id: "valid_id",
    name: "valid_name",
    email: "VALID-EMAIL@MAIL.COM",
    document: "11111111111",
    pixKeyType: "EMAIL",
    pixKey: "VALID-EMAIL@MAIL.COM",
    status: "RASCUNHO",
  },
];

export const makeSut = (): SutTypes => {
  const listReceiversStub = makeListReceivers();
  const sut = new ListAllReceiversController(listReceiversStub);

  return {
    sut,
    listReceiversStub,
  };
};

const makeListReceivers = (): ListReceivers => {
  class ListReceiversStub implements ListReceivers {
    list(): Promise<ReceiverModel[]> {
      return new Promise((resolve) => resolve(fakeListOfReceivers));
    }
    listBy(field: string): Promise<ReceiverModel[]> {
      throw new Error("Method not implemented.");
    }
    listOne(id: String | ObjectId): Promise<ReceiverModel> {
      throw new Error("Method not implemented.");
    }
  }

  return new ListReceiversStub();
};
