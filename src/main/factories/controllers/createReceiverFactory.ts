import { makeDbAddReceiver } from "@/main/factories";
import { CreateReceiverController } from "@/presentation/controllers";
import { Controller } from "@/presentation/protocols";
import { CreateReceiverValidatorAdapter } from "@/presentation/utils";

export const makeCreateReceiverController = (): Controller => {
  const createReceiverValidatorAdapter = new CreateReceiverValidatorAdapter();
  const controller = new CreateReceiverController(
    makeDbAddReceiver(),
    createReceiverValidatorAdapter
  );

  return controller;
};
