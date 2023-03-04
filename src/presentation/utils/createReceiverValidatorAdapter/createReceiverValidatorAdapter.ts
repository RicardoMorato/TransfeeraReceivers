import validator from "validator";
import { PixKeyType } from "@/domain/models/Receiver";
import { InvalidParamError, MissingParamError } from "@/presentation/errors";
import {
  HttpRequest,
  CreateReceiverValidation,
} from "@/presentation/protocols";
import { ValidationResult } from "./createReceiverValidatorAdapterProtocol";
import { isStringValidPixKeyType } from "../isStringValidPixKeyType";

export class CreateReceiverValidatorAdapter
  implements CreateReceiverValidation
{
  validate(request: HttpRequest): ValidationResult {
    const requiredFields = ["pixKeyType", "pixKey"];

    for (const field of requiredFields) {
      if (!request.body[field])
        return {
          error: new MissingParamError(field),
          isValid: false,
          errorType: "MISSING_PARAM",
          statusCode: 400,
        };
    }

    const { document, email, pixKeyType, pixKey } = request.body;

    if (email) {
      if (!this.isEmailValid(email))
        return {
          error: new InvalidParamError("email"),
          isValid: false,
          errorType: "INVALID_PARAM",
          statusCode: 400,
        };
    }

    if (document) {
      if (!this.isDocumentValid(document))
        return {
          error: new InvalidParamError("document"),
          isValid: false,
          errorType: "INVALID_PARAM",
          statusCode: 400,
        };
    }

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

  isEmailValid(email: string): boolean {
    const isValid = validator.isEmail(email) && email.length <= 250;

    return isValid;
  }

  isDocumentValid(document: string): boolean {
    const documentMatchesPattern =
      document.match(/^[0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2}$/) || // CPF pattern
      document.match(
        /^[0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2}$/ // CNPJ pattern
      );

    if (documentMatchesPattern) return true;

    return false;
  }

  isPixKeyTypeValid(pixKeyType: string): boolean {
    if (isStringValidPixKeyType(pixKeyType as PixKeyType)) return true;

    return false;
  }

  isPixKeyValid: (pixKey: string, pixKeyType: PixKeyType) => boolean;
}
