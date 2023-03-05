import { InsertOneResult, Document } from "mongodb";
import { database } from "@/infra/db";
import { AddReceiverRepository } from "@/data/protocols/receiverRepository";
import { AddReceiverModel } from "@/domain/useCases/addReceiver";

export class ReceiverMongoRepository implements AddReceiverRepository {
  async add(receiver: AddReceiverModel): Promise<InsertOneResult<Document>> {
    const receiverCollection = database.getCollection("receivers");
    const result = await receiverCollection.insertOne(receiver);

    return result;
  }
}
