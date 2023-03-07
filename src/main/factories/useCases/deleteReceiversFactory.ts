import { DbHandlerDeleteReceivers } from "@/data/useCases/deleteReceivers/dbHandlerDeleteReceivers";
import { DeleteReceivers } from "@/domain/useCases/deleteReceiver";
import { ReceiverMongoRepository } from "@/infra/db";

export const makeDbDeleteReceivers = (): DeleteReceivers => {
  const receiverMongoRepository = new ReceiverMongoRepository();

  return new DbHandlerDeleteReceivers(receiverMongoRepository);
};
