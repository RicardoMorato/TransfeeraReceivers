import { InvalidParamError } from "@/presentation/errors";
import {
  HttpRequest,
  ListReceiversByFieldValidation,
} from "@/presentation/protocols";
import { ValidationResult } from "../createReceiverValidatorAdapter";

export class ListReceiversByFieldValidatorAdapter
  implements ListReceiversByFieldValidation
{
  validate(request: HttpRequest): ValidationResult {
    if (!request.params)
      return {
        error: new InvalidParamError("params"),
        isValid: false,
      };

    if (!request.params.searchBy)
      return {
        error: new InvalidParamError("searchBy"),
        isValid: false,
      };

    return {
      error: null,
      isValid: true,
    };
  }
}
