import { DeleteReceivers } from "@/domain/useCases/deleteReceiver";
import { InvalidParamError, NotFoundError } from "@/presentation/errors";
import {
  Controller,
  HttpRequest,
  HttpResponse,
} from "@/presentation/protocols";
import {
  badRequest,
  ok,
  serverError,
} from "@/presentation/responseSchemas/http-helper";

export class DeleteManyReceiversController implements Controller {
  private readonly deleteReceivers: DeleteReceivers;

  constructor(deleteReceivers: DeleteReceivers) {
    this.deleteReceivers = deleteReceivers;
  }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const { ids } = request.body;

      if (!Array.isArray(ids)) return badRequest(new InvalidParamError("Ids"));

      const receivers = await this.deleteReceivers.deleteMany(ids);

      const deletedReceivers = receivers.filter(
        (receiver) => receiver !== null
      );

      return ok({ data: { deletedReceivers } });
    } catch (error: unknown) {
      return serverError(error as Error);
    }
  }
}
