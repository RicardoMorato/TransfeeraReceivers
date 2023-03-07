import { ListOneReceiverController } from "@/presentation/controllers";
import { Controller } from "@/presentation/protocols";
import { makeDbListReceivers } from "../useCases";

export const makeListOneReceiverController = (): Controller => {
  const controller = new ListOneReceiverController(makeDbListReceivers());

  return controller;
};
