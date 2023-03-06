import { ListReceiversByField } from "@/presentation/controllers";
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
  sut: ListReceiversByField;
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
  {
    id: "valid_id",
    name: "valid_name",
    email: "VALID-EMAIL@MAIL.COM",
    document: "11111111111",
    pixKeyType: "EMAIL",
    pixKey: "VALID-EMAIL@MAIL.COM",
    status: "VALIDADO",
  },
];

export const makeSut = (): SutTypes => {
  const listReceiversStub = makeListReceivers();
  const validatorAdapterStub = makeValidatorAdapterStub();
  const sut = new ListReceiversByField(listReceiversStub, validatorAdapterStub);

  return {
    sut,
    listReceiversStub,
    validatorAdapterStub,
  };
};

const makeListReceivers = (): ListReceivers => {
  class ListReceiversStub implements ListReceivers {
    list(pageNumber: number): Promise<PaginatedResponse> {
      throw new Error("Method not implemented.");
    }
    listBy(value: string): Promise<ReceiverModel[]> {
      const filteredReceivers = fakeListOfReceivers.filter((receiver) => {
        for (const v of Object.values(receiver))
          if (v === value) return receiver;
      });

      return new Promise((resolve) => resolve(filteredReceivers));
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
