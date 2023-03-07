import { ReceiverModel } from "@/domain/models";

export interface UpdateReceiverModel {
  name?: string;
  document?: string;
  email?: string;
  pixKeyType: string;
  pixKey: string;
  bank?: string;
  agency?: string;
  accountType?: string;
  accountNumber?: string;
}

export interface UpdateReceiver {
  update(receiver: UpdateReceiverModel): Promise<ReceiverModel>;
}
