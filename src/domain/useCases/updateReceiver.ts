import { ObjectId } from "mongodb";
import { ReceiverModel, Status } from "../models";

export interface UpdateReceiverModel {
  id: string | ObjectId;
  name?: string;
  document?: string;
  email?: string;
  pixKeyType: string;
  pixKey: string;
  bank?: string;
  agency?: string;
  accountType?: string;
  accountNumber?: string;
  status: Status;
}

export interface UpdateReceiver {
  update(receiver: UpdateReceiverModel): Promise<ReceiverModel>;
}
