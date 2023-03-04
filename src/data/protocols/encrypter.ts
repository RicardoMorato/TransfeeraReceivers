import { PixKeyType } from "../useCases/addReceiver/dbHandlerAddReceiverProtocols";

export interface Encrypter {
  encrypt(value: string | PixKeyType): Promise<string | PixKeyType>;
}
