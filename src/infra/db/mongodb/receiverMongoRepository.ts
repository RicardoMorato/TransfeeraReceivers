import { InsertOneResult, Document, ObjectId } from "mongodb";
import { database } from "@/infra/db";
import {
  AddReceiverRepository,
  ListReceiverRepository,
  UpdateReceiverRepository,
} from "@/data/protocols/receiverRepository";
import { AddReceiverModel } from "@/domain/useCases/addReceiver";
import { UpdateReceiverModel } from "@/domain/useCases/updateReceiver";
import { ReceiverModel } from "@/domain/models";

export class ReceiverMongoRepository
  implements
    AddReceiverRepository,
    ListReceiverRepository,
    UpdateReceiverRepository
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

  async listBy(value: string): Promise<ReceiverModel[]> {
    const receiverCollection = database.getCollection("receivers");
    const query = { $text: { $search: value } };
    const cursor = receiverCollection.find<ReceiverModel>(query);

    const result = await cursor.toArray();

    return result;
  }

  async listOne(id: String | ObjectId): Promise<ReceiverModel> {
    const receiverCollection = database.getCollection("receivers");

    let sanitizedId = null;

    try {
      sanitizedId = new ObjectId(id as ObjectId);
    } catch (e) {
      return null;
    }

    const result = await receiverCollection.findOne<ReceiverModel>({
      _id: sanitizedId,
    });

    return result;
  }

  async update(receiver: UpdateReceiverModel): Promise<ReceiverModel> {
    const receiverCollection = database.getCollection("receivers");

    let sanitizedId = null;

    try {
      sanitizedId = new ObjectId(receiver.id as ObjectId);
    } catch (e) {
      return null;
    }

    delete receiver.id;

    console.log(receiver);

    const result = (await receiverCollection.findOneAndReplace(
      {
        _id: sanitizedId,
      },
      receiver
    )) as unknown as ReceiverModel;

    return result;
  }
}
