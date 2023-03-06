import { ListReceiversByFieldValidatorAdapter } from "@/presentation/utils/listReceiversByFieldValidatorAdapter";
import { ListReceiversByField } from "@/presentation/controllers";
import { makeDbListReceivers } from "../useCases";
import { Controller } from "@/presentation/protocols";

export const makeListReceiversByFieldController = (): Controller => {
  const listReceiversByFieldValidatorAdapter =
    new ListReceiversByFieldValidatorAdapter();
  const controller = new ListReceiversByField(
    makeDbListReceivers(),
    listReceiversByFieldValidatorAdapter
  );

  return controller;
};
