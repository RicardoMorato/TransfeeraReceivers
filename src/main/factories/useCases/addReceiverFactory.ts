import { DbHandlerAddReceiver } from "@/data/useCases/addReceiver/dbHandlerAddReceiver";
import { AddReceiver } from "@/domain/useCases/addReceiver";
import { ReceiverMongoRepository } from "@/infra/db";
import { CryptrAdapter } from "@/infra/cryptography";

export const makeDbAddReceiver = (): AddReceiver => {
  const cryptrAdapter = new CryptrAdapter();
  const receiverMongoRepository = new ReceiverMongoRepository();

  return new DbHandlerAddReceiver(cryptrAdapter, receiverMongoRepository);
};
