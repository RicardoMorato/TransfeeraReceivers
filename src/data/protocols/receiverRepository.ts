import { Document, InsertOneResult } from "mongodb";
import { AddReceiverModel } from "@/domain/useCases/addReceiver";

export interface AddReceiverRepository {
  add(receiver: AddReceiverModel): Promise<InsertOneResult<Document>>;
}
