import { ListReceivers } from "@/domain/useCases/listReceivers";
import {
  Controller,
  HttpResponse,
  ListReceiversByFieldValidation,
} from "@/presentation/protocols";
import {
  badRequest,
  ok,
  serverError,
} from "@/presentation/responseSchemas/http-helper";

export class ListReceiversByField implements Controller {
  private readonly listReceivers: ListReceivers;
  private readonly validatorAdapter: ListReceiversByFieldValidation;

  constructor(
    listReceivers: ListReceivers,
    validatorAdapter: ListReceiversByFieldValidation
  ) {
    this.listReceivers = listReceivers;
    this.validatorAdapter = validatorAdapter;
  }

  async handle(request: any): Promise<HttpResponse> {
    try {
      const { isValid, error } = this.validatorAdapter.validate(request);

      if (!isValid) return badRequest(error);

      const { searchBy } = request.params;

      const receivers = await this.listReceivers.listBy(searchBy);

      return ok({ data: receivers });
    } catch (error: unknown) {
      return serverError(error as Error);
    }
  }
}
