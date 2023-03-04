import { ReceiverModel } from "../../domain/models/Receiver";
import { AddReceiverModel } from "../../domain/useCases/addReceiver";

export interface ReceiverRepository {
  add(receiver: AddReceiverModel): Promise<ReceiverModel>;
}
