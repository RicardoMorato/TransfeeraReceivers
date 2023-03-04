import {
  CreateReceiverValidation,
  HttpRequest,
} from "@/presentation/protocols";
import { CreateReceiverController } from "@/presentation/controllers";
import { AddReceiver, AddReceiverModel } from "@/domain/useCases/addReceiver";
import { PixKeyType, ReceiverModel } from "@/domain/models/Receiver";
import { ValidationResult } from "@/presentation/utils/createReceiverValidatorAdapter";

interface SutTypes {
  sut: CreateReceiverController;
  addReceiverStub: AddReceiver;
  validatorAdapterStub: CreateReceiverValidation;
}

export const makeSut = (): SutTypes => {
  const addReceiverStub = makeAddReceiver();
  const validatorAdapterStub = makeValidatorAdapter();
  const sut = new CreateReceiverController(
    addReceiverStub,
    validatorAdapterStub
  );

  return {
    sut,
    validatorAdapterStub,
    addReceiverStub,
  };
};

const makeAddReceiver = (): AddReceiver => {
  class AddReceiverStub implements AddReceiver {
    add(receiver: AddReceiverModel): Promise<ReceiverModel> {
      const fakeReceiver: ReceiverModel = {
        ...receiver,
        id: "valid_id",
        status: "RASCUNHO",
      };

      return new Promise((resolve) => resolve(fakeReceiver));
    }
  }

  return new AddReceiverStub();
};

const makeValidatorAdapter = (): CreateReceiverValidation => {
  class ValidatorAdapterStub implements CreateReceiverValidation {
    validate(request: HttpRequest): ValidationResult {
      return {
        error: null,
        isValid: true,
      };
    }
    isEmailValid: (email: string) => boolean;
    isDocumentValid: (document: string) => boolean;
    isPixKeyTypeValid: (pixKeyType: string) => boolean;
    isPixKeyValid: (pixKey: string, pixKeyType: PixKeyType) => boolean;
  }

  return new ValidatorAdapterStub();
};
