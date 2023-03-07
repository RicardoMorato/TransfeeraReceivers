import { InvalidParamError } from "@/presentation/errors";
import {
  HttpRequest,
  UpdateReceiverValidation,
  UpdateType,
  ValidationResult,
} from "@/presentation/protocols";
import { CreateReceiverValidatorAdapter } from "../createReceiverValidatorAdapter";

export class UpdateReceiverValidatorAdapter
  extends CreateReceiverValidatorAdapter
  implements UpdateReceiverValidation
{
  constructor() {
    super();
  }

  validateUpdate(request: HttpRequest): ValidationResult {
    const { error, isValid } = this.validate(request);

    if (!isValid)
      return {
        isValid,
        error,
      };

    const statusValidation = this.isStatusValid(request.body.status);

    if (!statusValidation.isValid)
      return {
        error: new InvalidParamError("status"),
        isValid: false,
      };

    const { updateType } = statusValidation;

    if (updateType === "COMPLETE")
      return {
        error: null,
        isValid: true,
        type: "COMPLETE",
      };

    return {
      error: null,
      isValid: true,
      type: "ONLY-EMAIL",
    };
  }

  isStatusValid(receiverStatus: string): UpdateType {
    const expectedStatus = ["RASCUNHO", "VALIDADO"];

    if (!expectedStatus.includes(receiverStatus))
      return {
        isValid: false,
        updateType: "INVALID",
      };

    if (receiverStatus === "RASCUNHO")
      return {
        isValid: true,
        updateType: "COMPLETE",
      };

    return {
      isValid: true,
      updateType: "ONLY-EMAIL",
    };
  }
}
