import { ListReceivers } from "@/domain/useCases/listReceivers";
import { ok, serverError } from "@/presentation/helpers/http-helper";
import { Controller, HttpResponse } from "@/presentation/protocols";

export class ListAllReceiversController implements Controller {
  private readonly listReceivers: ListReceivers;

  constructor(listReceivers: ListReceivers) {
    this.listReceivers = listReceivers;
  }

  async handle(): Promise<HttpResponse> {
    try {
      const receivers = await this.listReceivers.list();

      return ok({ data: receivers });
    } catch (error: unknown) {
      return serverError(error as Error);
    }
  }
}
