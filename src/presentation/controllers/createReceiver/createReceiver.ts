import {
  Controller,
  CreateReceiverValidation,
  HttpRequest,
  HttpResponse,
} from "@/presentation/protocols";
import {
  badRequest,
  serverError,
  created,
} from "@/presentation/helpers/http-helper";
import { AddReceiver } from "@/domain/useCases/addReceiver";

export class CreateReceiverController implements Controller {
  private readonly addReceiver: AddReceiver;
  private readonly validatorAdapter: CreateReceiverValidation;

  constructor(
    addReceiver: AddReceiver,
    validatorAdapter: CreateReceiverValidation
  ) {
    this.addReceiver = addReceiver;
    this.validatorAdapter = validatorAdapter;
  }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const { isValid, error } = this.validatorAdapter.validate(request);

      if (!isValid) return badRequest(error);

      const { name, document, email, pixKeyType, pixKey } = request.body;

      const receiver = await this.addReceiver.add({
        name: name || "",
        document: document || "",
        email: email || "",
        pixKeyType,
        pixKey,
      });

      return created({
        message: `Receiver created with id: ${receiver.id}`,
        id: receiver.id,
      });
    } catch (error: unknown) {
      return serverError(error as Error);
    }
  }
}
