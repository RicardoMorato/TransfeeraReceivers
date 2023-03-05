import { Collection, Document, MongoClient } from "mongodb";

import { DatabaseHelper } from "@/infra/db";
import { ReceiverModel } from "@/domain/models/Receiver";

export class DBHelper implements DatabaseHelper {
  private client: MongoClient;
  private readonly connectionUri: string;

  constructor(connectionUri: string) {
    this.connectionUri = connectionUri;
    this.client = null;
  }

  async connect(): Promise<void> {
    this.client = await MongoClient.connect(this.connectionUri);
  }

  async disconnect(): Promise<void> {
    await this.client.close();

    this.client = null;
  }

  getCollection(
    collectionName: string
  ): Collection<Document> | ReceiverModel[] {
    return this.client.db().collection(collectionName);
  }
}
