import { DeleteOneReceiverController } from "@/presentation/controllers";
import { Controller } from "@/presentation/protocols";
import { makeDbDeleteReceivers } from "../useCases";

export const makeDeleteOneReceiverController = (): Controller => {
  const controller = new DeleteOneReceiverController(makeDbDeleteReceivers());

  return controller;
};
