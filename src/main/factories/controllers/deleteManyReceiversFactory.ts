import { DeleteManyReceiversController } from "@/presentation/controllers";
import { Controller } from "@/presentation/protocols";
import { makeDbDeleteReceivers } from "../useCases";

export const makeDeleteManyReceiversController = (): Controller => {
  const controller = new DeleteManyReceiversController(makeDbDeleteReceivers());

  return controller;
};
