import { DeleteReceivers } from "@/domain/useCases/deleteReceiver";
import { NotFoundError } from "@/presentation/errors";
import {
  Controller,
  HttpRequest,
  HttpResponse,
} from "@/presentation/protocols";
import {
  noContent,
  notFound,
  serverError,
} from "@/presentation/responseSchemas/http-helper";

export class DeleteOneReceiverController implements Controller {
  private readonly deleteReceivers: DeleteReceivers;

  constructor(deleteReceivers: DeleteReceivers) {
    this.deleteReceivers = deleteReceivers;
  }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = request.params;

      const receiver = await this.deleteReceivers.deleteOne(id);

      if (!receiver) return notFound(new NotFoundError());

      return noContent();
    } catch (error: unknown) {
      return serverError(error as Error);
    }
  }
}
