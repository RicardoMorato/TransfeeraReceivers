import { ObjectId } from "mongodb";
import { ReceiverModel } from "@/domain/models";

export interface ListReceivers {
  list(pageNumber: number): Promise<PaginatedResponse>;
  listBy(field: string, value: string): Promise<ReceiverModel[]>;
  listOne(id: String | ObjectId): Promise<ReceiverModel>;
}

export interface PaginatedResponse {
  data: ReceiverModel[];
  totalPages: number;
}
