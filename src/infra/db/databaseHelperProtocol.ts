import { ReceiverModel } from "@/domain/models/Receiver";
import { Collection } from "mongodb";

export interface DatabaseHelper {
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  getCollection: (collectionName: string) => Collection;
  createTextIndex: (collectionName: string) => void;
}
