import { ObjectId } from "mongodb";
import { ReceiverModel } from "@/domain/models";

export interface ListReceivers {
  list(): Promise<ReceiverModel[]>;
  listBy(field: string): Promise<ReceiverModel[]>;
  listOne(id: String | ObjectId): Promise<ReceiverModel>;
}
