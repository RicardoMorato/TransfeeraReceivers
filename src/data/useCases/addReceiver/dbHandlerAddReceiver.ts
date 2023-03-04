import {
  AddReceiver,
  AddReceiverModel,
  ReceiverModel,
  ReceiverRepository,
  Encrypter,
} from "./dbHandlerAddReceiverProtocols";

export class DbHandlerAddReceiver implements AddReceiver {
  private readonly encrypter: Encrypter;
  private readonly ReceiverRepository: ReceiverRepository;

  constructor(encrypter: Encrypter, ReceiverRepository: ReceiverRepository) {
    this.encrypter = encrypter;
    this.ReceiverRepository = ReceiverRepository;
  }

  async add(receiverData: AddReceiverModel): Promise<ReceiverModel> {
    const encryptedValues = {
      document: await this.encrypter.encrypt(receiverData.document),
      email: await this.encrypter.encrypt(receiverData.email),
      pixKeyType: await this.encrypter.encrypt(
        receiverData.pixKeyType.toString()
      ),
      pixKey: await this.encrypter.encrypt(receiverData.pixKey),
    };

    const receiver = await this.ReceiverRepository.add({
      ...encryptedValues,
      name: receiverData.name,
    });

    return new Promise((resolve) => resolve(receiver));
  }
}
