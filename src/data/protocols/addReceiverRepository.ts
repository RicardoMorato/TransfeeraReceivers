import { ReceiverModel } from "../../domain/models/Receiver";
import { AddReceiverModel } from "../../domain/useCases/addReceiver";

export interface AddReceiverRepository {
  add(receiver: AddReceiverModel): Promise<ReceiverModel>;
}
