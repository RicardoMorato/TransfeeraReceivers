import {
  AddReceiver,
  AddReceiverModel,
  ReceiverModel,
  AddReceiverRepository,
  Encrypter,
} from "./dbHandlerAddReceiverProtocols";
import { Status } from "@/domain/models/Receiver";

export class DbHandlerAddReceiver implements AddReceiver {
  private readonly encrypter: Encrypter;
  private readonly addReceiverRepository: AddReceiverRepository;

  constructor(
    encrypter: Encrypter,
    addReceiverRepository: AddReceiverRepository
  ) {
    this.encrypter = encrypter;
    this.addReceiverRepository = addReceiverRepository;
  }

  async add(receiverData: AddReceiverModel): Promise<ReceiverModel> {
    const encryptedValues = {
      document: await this.encrypter.encrypt(receiverData.document),
      email: await this.encrypter.encrypt(receiverData.email),
      pixKeyType: await this.encrypter.encrypt(
        receiverData.pixKeyType.toString()
      ),
      pixKey: await this.encrypter.encrypt(receiverData.pixKey),
      status: "RASCUNHO" as Status,
    };

    const receiverBody = {
      ...encryptedValues,
      name: receiverData.name,
    };

    const receiver = await this.addReceiverRepository.add(receiverBody);

    const result = {
      ...receiverBody,
      id: receiver.insertedId,
    };

    return new Promise((resolve) => resolve(result));
  }
}
