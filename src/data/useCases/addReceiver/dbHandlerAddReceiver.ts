import {
  AddReceiver,
  AddReceiverModel,
  ReceiverModel,
  AddReceiverRepository,
  Encrypter,
} from "./dbHandlerAddReceiverProtocols";

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
    };

    const receiver = await this.addReceiverRepository.add({
      ...encryptedValues,
      name: receiverData.name,
    });

    return new Promise((resolve) => resolve(receiver));
  }
}
