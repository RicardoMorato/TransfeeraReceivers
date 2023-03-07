import { PixKeyType, ReceiverModel, Status } from "@/domain/models";
import {
  ListReceivers,
  PaginatedResponse,
} from "@/domain/useCases/listReceivers";
import {
  UpdateReceiver,
  UpdateReceiverModel,
} from "@/domain/useCases/updateReceiver";
import {
  HttpRequest,
  UpdateReceiverValidation,
  UpdateType,
  ValidationResult,
} from "@/presentation/protocols";
import { ObjectId } from "mongodb";
import { UpdateReceiverController } from "../updateReceiver";

interface SutTypes {
  sut: UpdateReceiverController;
  updateReceiverStub: UpdateReceiver;
  validatorAdapterStub: UpdateReceiverValidation;
}

export const makeSut = (): SutTypes => {
  const updateReceiverStub = makeUpdateReceiver();
  const listReceiversStub = makeListReceiver();
  const validatorAdapterStub = makeValidatorAdapter();
  const sut = new UpdateReceiverController(
    updateReceiverStub,
    listReceiversStub,
    validatorAdapterStub
  );

  return {
    sut,
    updateReceiverStub,
    validatorAdapterStub,
  };
};

const makeUpdateReceiver = (): UpdateReceiver => {
  class UpdateReceiverStub implements UpdateReceiver {
    update(receiver: UpdateReceiverModel): Promise<ReceiverModel> {
      return new Promise((resolve) => resolve(receiver));
    }
  }

  return new UpdateReceiverStub();
};

const makeListReceiver = (): ListReceivers => {
  class ListReceiversStub implements ListReceivers {
    list(pageNumber: number): Promise<PaginatedResponse> {
      throw new Error("Method not implemented.");
    }
    listBy(value: string): Promise<ReceiverModel[]> {
      throw new Error("Method not implemented.");
    }
    listOne(id: String | ObjectId): Promise<ReceiverModel> {
      return new Promise((resolve) => resolve(receiverData));
    }
  }

  return new ListReceiversStub();
};

const makeValidatorAdapter = (): UpdateReceiverValidation => {
  class ValidatorAdapterStub implements UpdateReceiverValidation {
    validateUpdate(request: HttpRequest): ValidationResult {
      return {
        error: null,
        isValid: true,
        type: "COMPLETE",
      };
    }
    isStatusValid: (receiverStatus: string) => UpdateType;
    validate: (request: HttpRequest) => ValidationResult;
    isEmailValid: (email: string) => boolean;
    isDocumentValid: (document: string) => boolean;
    isPixKeyTypeValid: (pixKeyType: string) => boolean;
    isPixKeyValid: (pixKey: string, pixKeyType: PixKeyType) => boolean;
  }

  return new ValidatorAdapterStub();
};

export const receiverData = {
  id: "valid_id",
  name: "valid_name",
  email: "VALID-EMAIL@MAIL.COM",
  document: "11111111111",
  pixKeyType: "EMAIL",
  pixKey: "VALID-EMAIL@MAIL.COM",
  status: "RASCUNHO" as Status,
};

export const request = {
  body: receiverData,
};
