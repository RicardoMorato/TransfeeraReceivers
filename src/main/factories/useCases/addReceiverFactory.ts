import { DbHandlerAddReceiver } from "@/data/useCases/addReceiver/dbHandlerAddReceiver";
import { AddReceiver } from "@/domain/useCases/addReceiver";
import { ReceiverMongoRepository } from "@/infra/db";
import { CryptrAdapter, DumbEncrypterAdapter } from "@/infra/cryptography";

export const makeDbAddReceiver = (): AddReceiver => {
  const cryptoAdapter = new DumbEncrypterAdapter();
  const receiverMongoRepository = new ReceiverMongoRepository();

  return new DbHandlerAddReceiver(cryptoAdapter, receiverMongoRepository);
};
