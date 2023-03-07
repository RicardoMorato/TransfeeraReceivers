import { PixKeyType } from "@/domain/models/Receiver";
import { InvalidParamError, MissingParamError } from "@/presentation/errors";
import {
  HttpRequest,
  CreateReceiverValidation,
  ValidationResult,
} from "@/presentation/protocols";
import { isStringValidPixKeyType } from "../isStringValidPixKeyType";
import { validationPatterns } from "../validationPatterns";

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
        };
    }

    const { document, email, pixKeyType, pixKey } = request.body;

    if (email) {
      if (!this.isEmailValid(email))
        return {
          error: new InvalidParamError("email"),
          isValid: false,
        };
    }

    if (document) {
      if (!this.isDocumentValid(document))
        return {
          error: new InvalidParamError("document"),
          isValid: false,
        };
    }

    if (!this.isPixKeyTypeValid(pixKeyType))
      return {
        error: new InvalidParamError("pixKeyType"),
        isValid: false,
      };

    if (!this.isPixKeyValid(pixKey, pixKeyType))
      return {
        error: new InvalidParamError("pixKey"),
        isValid: false,
      };

    return {
      error: null,
      isValid: true,
    };
  }

  isEmailValid(email: string): boolean {
    const isValid =
      email.match(validationPatterns.email) && email.length <= 250;

    return isValid;
  }

  isDocumentValid(document: string): boolean {
    const documentMatchesPattern =
      document.match(validationPatterns.cpf) ||
      document.match(validationPatterns.cnpj);

    if (documentMatchesPattern) return true;

    return false;
  }

  isPixKeyTypeValid(pixKeyType: string): boolean {
    if (isStringValidPixKeyType(pixKeyType as PixKeyType)) return true;

    return false;
  }

  isPixKeyValid(pixKey: string, pixKeyType: PixKeyType): boolean {
    switch (pixKeyType) {
      case "CHAVE_ALEATORIA":
        if (pixKey.match(validationPatterns.randomKey)) return true;

        return false;
        break;

      case "CPF":
        if (pixKey.match(validationPatterns.cpf)) return true;

        return false;
        break;

      case "CNPJ":
        if (pixKey.match(validationPatterns.cnpj)) return true;

        return false;
        break;

      case "EMAIL":
        if (pixKey.match(validationPatterns.email)) return true;

        return false;
        break;

      case "TELEFONE":
        if (pixKey.match(validationPatterns.phone)) return true;

        return false;
        break;
      default:
        return false;
        break;
    }
  }
}
