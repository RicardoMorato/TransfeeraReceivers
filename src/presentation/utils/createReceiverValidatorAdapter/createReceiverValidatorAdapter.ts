import validator from "validator";
import { InvalidParamError, MissingParamError } from "@/presentation/errors";
import {
  HttpRequest,
  CreateReceiverValidation,
} from "@/presentation/protocols";
import { ValidationResult } from "./createReceiverValidatorAdapterProtocol";

export class CreateReceiverValidatorAdapter
  implements CreateReceiverValidation
{
  validate(request: HttpRequest): ValidationResult {
    const requiredFields = [
      "name",
      "document",
      "email",
      "pixKeyType",
      "pixKey",
    ];

    for (const field of requiredFields) {
      if (!request.body[field])
        return {
          error: new MissingParamError(field),
          isValid: false,
          errorType: "MISSING_PARAM",
          statusCode: 400,
        };
    }

    const { name, document, email, pixKeyType, pixKey } = request.body;

    if (!this.isNameValid(name))
      return {
        error: new InvalidParamError("name"),
        isValid: false,
        errorType: "INVALID_PARAM",
        statusCode: 400,
      };

    if (!this.isEmailValid(email))
      return {
        error: new InvalidParamError("email"),
        isValid: false,
        errorType: "INVALID_PARAM",
        statusCode: 400,
      };

    if (!this.isDocumentValid(document))
      return {
        error: new InvalidParamError("document"),
        isValid: false,
        errorType: "INVALID_PARAM",
        statusCode: 400,
      };

    if (!this.isPixKeyTypeValid(pixKeyType))
      return {
        error: new InvalidParamError("pixKeyType"),
        isValid: false,
        errorType: "INVALID_PARAM",
        statusCode: 400,
      };

    if (!this.isPixKeyValid(pixKey, pixKeyType))
      return {
        error: new InvalidParamError("pixKeyType"),
        isValid: false,
        errorType: "INVALID_PARAM",
        statusCode: 400,
      };

    return {
      error: null,
      isValid: true,
      errorType: null,
      statusCode: 200,
    };
  }
  isNameValid: (name: string) => boolean;
  isEmailValid: (email: string) => boolean;
  isDocumentValid: (document: string) => boolean;
  isPixKeyTypeValid: (pixKeyType: string) => boolean;
  isPixKeyValid: (pixKey: string, pixKeyType: string) => boolean;
}
