import { PixKeyType } from "@/domain/models/Receiver";
import { ValidationResult } from "@/presentation/utils/createReceiverValidatorAdapter";
import { HttpRequest } from "./http";

export interface CreateReceiverValidation {
  validate: (request: HttpRequest) => ValidationResult;
  isEmailValid: (email: string) => boolean;
  isDocumentValid: (document: string) => boolean;
  isPixKeyTypeValid: (pixKeyType: PixKeyType | string) => boolean;
  isPixKeyValid: (pixKey: string, pixKeyType: PixKeyType) => boolean;
}

export interface ListAllReceiversValidation {
  validate: (request: HttpRequest) => ValidationResult;
}
