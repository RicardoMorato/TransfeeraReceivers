import { ListReceivers } from "@/domain/useCases/listReceivers";
import { NotFoundError } from "@/presentation/errors";
import {
  Controller,
  HttpRequest,
  HttpResponse,
} from "@/presentation/protocols";
import {
  notFound,
  ok,
  serverError,
} from "@/presentation/responseSchemas/http-helper";

export class ListOneReceiverController implements Controller {
  private readonly listReceivers: ListReceivers;

  constructor(listReceivers: ListReceivers) {
    this.listReceivers = listReceivers;
  }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = request.params;

      const receiver = await this.listReceivers.listOne(id);

      if (!receiver) return notFound(new NotFoundError());

      return ok({ data: receiver });
    } catch (error: unknown) {
      return serverError(error as Error);
    }
  }
}
