import { PixKeyType } from "@/domain/models/Receiver";
import { HttpRequest } from "./http";

export interface CreateReceiverValidation {
  validate: (request: HttpRequest) => ValidationResult;
  isEmailValid: (email: string) => boolean;
  isDocumentValid: (document: string) => boolean;
  isPixKeyTypeValid: (pixKeyType: PixKeyType | string) => boolean;
  isPixKeyValid: (pixKey: string, pixKeyType: PixKeyType) => boolean;
}

export interface UpdateReceiverValidation extends CreateReceiverValidation {
  validateUpdate: (request: HttpRequest) => ValidationResult;
  isStatusValid: (receiverStatus: string) => UpdateType;
}

export interface ListAllReceiversValidation {
  validate: (request: HttpRequest) => ValidationResult;
}

export interface ListReceiversByFieldValidation {
  validate: (request: HttpRequest) => ValidationResult;
}

export interface ValidationResult {
  isValid: boolean;
  error: Error | null;
  type?: "COMPLETE" | "ONLY-EMAIL";
}

export interface UpdateType {
  isValid: boolean;
  updateType: "COMPLETE" | "ONLY-EMAIL" | "INVALID";
}
