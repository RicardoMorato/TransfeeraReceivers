import { DbHandlerListReceivers } from "@/data/useCases/listReceivers/dbHandlerListReceivers";
import { ListReceivers } from "@/domain/useCases/listReceivers";
import { ReceiverMongoRepository } from "@/infra/db";
import { CryptrAdapter } from "@/infra/cryptography";

export const makeDbListReceivers = (): ListReceivers => {
  const cryptrAdapter = new CryptrAdapter();
  const receiverMongoRepository = new ReceiverMongoRepository();

  return new DbHandlerListReceivers(cryptrAdapter, receiverMongoRepository);
};
