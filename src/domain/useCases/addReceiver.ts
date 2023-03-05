import { ReceiverModel } from "@/domain/models";

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
