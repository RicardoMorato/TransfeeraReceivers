import { ListReceivers } from "@/domain/useCases/listReceivers";
import {
  badRequest,
  ok,
  serverError,
} from "@/presentation/responseSchemas/http-helper";
import {
  Controller,
  HttpRequest,
  HttpResponse,
  ListAllReceiversValidation,
} from "@/presentation/protocols";

export class ListAllReceiversController implements Controller {
  private readonly listReceivers: ListReceivers;
  private readonly validatorAdapter: ListAllReceiversValidation;

  constructor(
    listReceivers: ListReceivers,
    validatorAdapter: ListAllReceiversValidation
  ) {
    this.listReceivers = listReceivers;
    this.validatorAdapter = validatorAdapter;
  }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const { isValid, error } = this.validatorAdapter.validate(request);

      if (!isValid) return badRequest(error);

      const { pageNumber } = request.params;

      const receivers = await this.listReceivers.list(pageNumber);

      return ok(receivers);
    } catch (error: unknown) {
      return serverError(error as Error);
    }
  }
}
