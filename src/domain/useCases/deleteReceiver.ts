import { ObjectId } from "mongodb";
import { ReceiverModel } from "../models";

export interface DeleteReceivers {
  deleteOne(id: String | ObjectId): Promise<ReceiverModel>;
  deleteMany(ids: String[] | ObjectId[]): Promise<String[]>;
}
