import { DeleteReceivers } from "@/domain/useCases/deleteReceiver";
import { ObjectId } from "mongodb";
import { DeleteReceiverRepository, ReceiverModel } from "@/data/useCases";

export class DbHandlerDeleteReceivers implements DeleteReceivers {
  private readonly deleteReceiversRepository: DeleteReceiverRepository;

  constructor(deleteReceiversRepository: DeleteReceiverRepository) {
    this.deleteReceiversRepository = deleteReceiversRepository;
  }

  async deleteOne(id: String | ObjectId): Promise<ReceiverModel> {
    const deletedReceiver = await this.deleteReceiversRepository.deleteOne(id);

    return deletedReceiver;
  }

  async deleteMany(ids: String[] | ObjectId[]): Promise<ReceiverModel[]> {
    const results: ReceiverModel[] = [];

    for (const id of ids) {
      const result = await this.deleteOne(id);
      results.push(result);
    }

    return results;
  }
}
