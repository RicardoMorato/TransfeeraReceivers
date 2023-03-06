import { makeDbListReceivers } from "@/main/factories";
import { ListAllReceiversController } from "@/presentation/controllers";
import { Controller } from "@/presentation/protocols";
import { ListAllReceiversValidatorAdapter } from "@/presentation/utils";

export const makeListAllReceiversController = (): Controller => {
  const listAllReceiversValidatorAdapter =
    new ListAllReceiversValidatorAdapter();
  const controller = new ListAllReceiversController(
    makeDbListReceivers(),
    listAllReceiversValidatorAdapter
  );

  return controller;
};
