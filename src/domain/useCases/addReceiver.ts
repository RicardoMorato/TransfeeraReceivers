import { ReceiverModel } from "../models/Receiver";

export interface AddReceiverModel {
  name?: string;
  document?: string;
  email?: string;
  pixKeyType: string;
  pixKey: string;
}

export interface AddReceiver {
  add(receiver: AddReceiverModel): Promise<ReceiverModel>;
}
