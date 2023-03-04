import { ReceiverModel, PixKeyType } from "../models/Receiver";

export interface AddReceiverModel {
  name: string;
  document: string;
  email: string;
  pixKeyType: PixKeyType;
  pixKey: string;
}

export interface AddReceiver {
  add(receiver: AddReceiverModel): Promise<ReceiverModel>;
}
