import { DbHandlerUpdateReceivers } from "@/data/useCases";
import { UpdateReceiver } from "@/domain/useCases/updateReceiver";
import { DumbEncrypterAdapter } from "@/infra/cryptography";
import { ReceiverMongoRepository } from "@/infra/db";

export const makeDbUpdateReceiver = (): UpdateReceiver => {
  const cryptoAdapter = new DumbEncrypterAdapter();
  const receiverMongoRepository = new ReceiverMongoRepository();

  return new DbHandlerUpdateReceivers(cryptoAdapter, receiverMongoRepository);
};
