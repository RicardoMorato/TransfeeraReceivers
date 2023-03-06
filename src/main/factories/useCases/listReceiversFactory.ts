import { DbHandlerListReceivers } from "@/data/useCases/listReceivers/dbHandlerListReceivers";
import { ListReceivers } from "@/domain/useCases/listReceivers";
import { ReceiverMongoRepository } from "@/infra/db";
import { CryptrAdapter, DumbEncrypterAdapter } from "@/infra/cryptography";

export const makeDbListReceivers = (): ListReceivers => {
  const cryptoAdapter = new DumbEncrypterAdapter();
  const receiverMongoRepository = new ReceiverMongoRepository();

  return new DbHandlerListReceivers(cryptoAdapter, receiverMongoRepository);
};
