import { ReceiverModel, Status } from "@/domain/models";
import {
  ListReceivers,
  PaginatedResponse,
} from "@/domain/useCases/listReceivers";
import { ObjectId } from "mongodb";
import { ListOneReceiverController } from "../listOneReceiver";

interface SutTypes {
  sut: ListOneReceiverController;
  listReceiversStub: ListReceivers;
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
  const listReceiversStub = makeListReceivers();
  const sut = new ListOneReceiverController(listReceiversStub);

  return {
    sut,
    listReceiversStub,
  };
};

const makeListReceivers = (): ListReceivers => {
  class ListReceiversStub implements ListReceivers {
    list(pageNumber: number): Promise<PaginatedResponse> {
      throw new Error("Method not implemented");
    }
    listBy(field: string): Promise<ReceiverModel[]> {
      throw new Error("Method not implemented.");
    }
    listOne(id: String | ObjectId): Promise<ReceiverModel> {
      return new Promise((resolve) => resolve(fakeReceiver));
    }
  }

  return new ListReceiversStub();
};
