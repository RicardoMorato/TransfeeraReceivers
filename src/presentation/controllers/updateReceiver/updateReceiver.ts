import { ReceiverModel } from "@/domain/models";
import { ListReceivers } from "@/domain/useCases/listReceivers";
import { UpdateReceiver } from "@/domain/useCases/updateReceiver";
import { MissingParamError, NotFoundError } from "@/presentation/errors";
import {
  Controller,
  HttpResponse,
  UpdateReceiverValidation,
} from "@/presentation/protocols";
import {
  badRequest,
  noContent,
  notFound,
  serverError,
} from "@/presentation/responseSchemas/http-helper";

export class UpdateReceiverController implements Controller {
  private readonly updateReceiver: UpdateReceiver;
  private readonly listReceiver: ListReceivers;
  private readonly validatorAdapter: UpdateReceiverValidation;

  constructor(
    updateReceiver: UpdateReceiver,
    listReceiver: ListReceivers,
    validatorAdapter: UpdateReceiverValidation
  ) {
    this.updateReceiver = updateReceiver;
    this.listReceiver = listReceiver;
    this.validatorAdapter = validatorAdapter;
  }

  async handle(request: any): Promise<HttpResponse> {
    try {
      const { isValid, error } = this.validatorAdapter.validateUpdate(request);

      if (!isValid) return badRequest(error);

      const { id } = request.body;

      if (!id) return badRequest(new MissingParamError("id"));

      const receiver = await this.listReceiver.listOne(id);

      if (!receiver) return notFound(new NotFoundError());

      if (receiver.status === "RASCUNHO") {
        const result = await this.updateReceiver.update(request.body);

        if (!result) return notFound(new NotFoundError());

        return noContent();
      }

      const result = await this.updateReceiver.update({
        ...receiver,
        email: request.body.email,
      });

      if (!result) return notFound(new NotFoundError());

      return noContent();
    } catch (error: unknown) {
      return serverError(error as Error);
    }
  }
}
