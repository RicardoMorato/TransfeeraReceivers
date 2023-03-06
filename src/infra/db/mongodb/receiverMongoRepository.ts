import { InsertOneResult, Document } from "mongodb";
import { database } from "@/infra/db";
import {
  AddReceiverRepository,
  ListReceiverRepository,
} from "@/data/protocols/receiverRepository";
import { AddReceiverModel } from "@/domain/useCases/addReceiver";
import { ReceiverModel } from "@/domain/models";

export class ReceiverMongoRepository
  implements AddReceiverRepository, ListReceiverRepository
{
  async add(receiver: AddReceiverModel): Promise<InsertOneResult<Document>> {
    const receiverCollection = database.getCollection("receivers");
    const result = await receiverCollection.insertOne(receiver);

    return result;
  }

  async list(): Promise<ReceiverModel[]> {
    const receiverCollection = database.getCollection("receivers");
    const cursor = receiverCollection.find<ReceiverModel>({});

    const result = await cursor.toArray();

    return result;
  }

  async listBy(field: string, value: string): Promise<ReceiverModel[]> {
    const receiverCollection = database.getCollection("receivers");
    const query = { [field]: new RegExp(`.*${value}.*`) };
    const cursor = receiverCollection.find<ReceiverModel>(query);

    const result = await cursor.toArray();

    return result;
  }
}
