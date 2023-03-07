import { ObjectId } from "mongodb";

export interface DeleteReceivers {
  deleteOne(id: String | ObjectId): Promise<void>;
  deleteMany(ids: String[] | ObjectId[]): Promise<void>;
}
