import {
  UpdateReceiver,
  UpdateReceiverModel,
} from "@/domain/useCases/updateReceiver";
import { ReceiverModel, Status } from "@/domain/models";
import { Encrypter } from "@/data/protocols/encrypter";
import { UpdateReceiverRepository } from "@/data/protocols/receiverRepository";

export class DbHandlerUpdateReceivers implements UpdateReceiver {
  private readonly encrypter: Encrypter;
  private readonly updateReceiverRepository: UpdateReceiverRepository;

  constructor(
    encrypter: Encrypter,
    updateReceiverRepository: UpdateReceiverRepository
  ) {
    this.encrypter = encrypter;
    this.updateReceiverRepository = updateReceiverRepository;
  }

  async update(receiverData: UpdateReceiverModel): Promise<ReceiverModel> {
    const encryptedValues = {
      document: await this.encrypter.encrypt(receiverData.document),
      email: await this.encrypter.encrypt(receiverData.email),
      pixKeyType: await this.encrypter.encrypt(
        receiverData.pixKeyType.toString()
      ),
      pixKey: await this.encrypter.encrypt(receiverData.pixKey),
      status: receiverData.status as Status,
    };

    const receiverBody = {
      ...receiverData,
      ...encryptedValues,
    };

    const result = await this.updateReceiverRepository.update(receiverBody);

    return result;
  }
}
