import { ListReceivers } from "@/domain/useCases/listReceivers";
import { ok, serverError } from "@/presentation/responseSchemas/http-helper";
import {
  Controller,
  HttpRequest,
  HttpResponse,
} from "@/presentation/protocols";

export class ListAllReceiversController implements Controller {
  private readonly listReceivers: ListReceivers;

  constructor(listReceivers: ListReceivers) {
    this.listReceivers = listReceivers;
  }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const receivers = await this.listReceivers.list();

      return ok({ data: receivers });
    } catch (error: unknown) {
      return serverError(error as Error);
    }
  }
}
