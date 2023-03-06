import { Document, InsertOneResult } from "mongodb";
import { AddReceiverModel } from "@/domain/useCases/addReceiver";
import { ReceiverModel } from "@/domain/models";

export interface AddReceiverRepository {
  add(receiver: AddReceiverModel): Promise<InsertOneResult<Document>>;
}

export interface ListReceiverRepository {
  list(): Promise<ReceiverModel[]>;
}
