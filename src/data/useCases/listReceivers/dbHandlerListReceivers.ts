import { ObjectId } from "mongodb";
import {
  ReceiverModel,
  ListReceiverRepository,
  Encrypter,
} from "@/data/useCases";
import {
  ListReceivers,
  PaginatedResponse,
} from "@/domain/useCases/listReceivers";
import { paginate } from "./utils";

export class DbHandlerListReceivers implements ListReceivers {
  private readonly encrypter: Encrypter;
  private readonly listReceiverRepository: ListReceiverRepository;
  private readonly PAGE_SIZE: number;

  constructor(
    encrypter: Encrypter,
    listReceiverRepository: ListReceiverRepository
  ) {
    this.encrypter = encrypter;
    this.listReceiverRepository = listReceiverRepository;
    this.PAGE_SIZE = 10;
  }

  async list(pageNumber: number): Promise<PaginatedResponse> {
    const receivers = await this.listReceiverRepository.list();

    const paginatedResult = paginate(receivers, pageNumber, this.PAGE_SIZE);

    const result = {
      data: [],
      totalPages: paginatedResult.totalPages,
    };

    for (const receiver of paginatedResult.data) {
      const decryptedReceiver = {
        ...receiver,
        document: await this.encrypter.decrypt(receiver.document),
        email: await this.encrypter.decrypt(receiver.email),
        pixKeyType: await this.encrypter.decrypt(receiver.email),
        pixKey: await this.encrypter.decrypt(receiver.pixKey),
      };

      result.data.push(decryptedReceiver);
    }

    return result;
  }

  async listBy(value: string): Promise<ReceiverModel[]> {
    const receivers = await this.listReceiverRepository.listBy(value);

    return receivers;
  }

  async listOne(id: String | ObjectId): Promise<ReceiverModel> {
    const receiver = await this.listReceiverRepository.listOne(id);

    return receiver;
  }
}
