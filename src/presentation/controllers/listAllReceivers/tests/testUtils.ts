import { ListAllReceiversController } from "@/presentation/controllers";
import { ReceiverModel } from "@/domain/models/Receiver";
import {
  ListReceivers,
  PaginatedResponse,
} from "@/domain/useCases/listReceivers";
import { ObjectId } from "mongodb";
import {
  HttpRequest,
  ListAllReceiversValidation,
} from "@/presentation/protocols";
import { ValidationResult } from "@/presentation/utils";

interface SutTypes {
  sut: ListAllReceiversController;
  listReceiversStub: ListReceivers;
  validatorAdapterStub: ListAllReceiversValidation;
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
  const validatorAdapterStub = makeValidatorAdapterStub();
  const sut = new ListAllReceiversController(
    listReceiversStub,
    validatorAdapterStub
  );

  return {
    sut,
    listReceiversStub,
    validatorAdapterStub,
  };
};

const makeListReceivers = (): ListReceivers => {
  class ListReceiversStub implements ListReceivers {
    list(pageNumber: number): Promise<PaginatedResponse> {
      return new Promise((resolve) =>
        resolve({ data: fakeListOfReceivers, totalPages: 1 })
      );
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

const makeValidatorAdapterStub = () => {
  class ValidatorAdapterStub implements ListAllReceiversValidation {
    validate(request: HttpRequest): ValidationResult {
      return {
        error: null,
        isValid: true,
      };
    }
  }

  return new ValidatorAdapterStub();
};
