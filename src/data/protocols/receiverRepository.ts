import { Document, InsertOneResult, ObjectId } from "mongodb";
import { AddReceiverModel } from "@/domain/useCases/addReceiver";
import { ReceiverModel } from "@/domain/models";
import { UpdateReceiverModel } from "@/domain/useCases/updateReceiver";

export interface AddReceiverRepository {
  add(receiver: AddReceiverModel): Promise<InsertOneResult<Document>>;
}

export interface ListReceiverRepository {
  list(): Promise<ReceiverModel[]>;
  listBy(value: string): Promise<ReceiverModel[]>;
  listOne(id: String | ObjectId): Promise<ReceiverModel>;
}

export interface UpdateReceiverRepository {
  update(receiver: UpdateReceiverModel): Promise<ReceiverModel>;
}

export interface DeleteReceiverRepository {
  deleteOne(id: String | ObjectId): Promise<ReceiverModel>;
}
