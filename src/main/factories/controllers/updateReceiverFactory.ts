import { UpdateReceiverController } from "@/presentation/controllers";
import { Controller } from "@/presentation/protocols";
import { UpdateReceiverValidatorAdapter } from "@/presentation/utils";
import { makeDbListReceivers, makeDbUpdateReceiver } from "../useCases";

export const makeUpdateReceiverController = (): Controller => {
  const updateReceiverValidatorAdapter = new UpdateReceiverValidatorAdapter();
  const controller = new UpdateReceiverController(
    makeDbUpdateReceiver(),
    makeDbListReceivers(),
    updateReceiverValidatorAdapter
  );

  return controller;
};
