import { InvalidParamError } from "@/presentation/errors";
import {
  HttpRequest,
  ListAllReceiversValidation,
  ValidationResult,
} from "@/presentation/protocols";

export class ListAllReceiversValidatorAdapter
  implements ListAllReceiversValidation
{
  validate(request: HttpRequest): ValidationResult {
    if (!request.params || !request.params.pageNumber) {
      request.params = {
        pageNumber: 1,
      };
      return {
        error: null,
        isValid: true,
      };
    }

    const pageNumber = parseInt(request.params.pageNumber);

    if (pageNumber < 0) {
      return {
        error: new InvalidParamError("pageNumber"),
        isValid: false,
      };
    }

    return {
      error: null,
      isValid: true,
    };
  }
}
