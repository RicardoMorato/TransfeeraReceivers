import { ObjectId } from "mongodb";

export interface ReceiverModel {
  id: string | ObjectId;
  name?: string;
  document?: string;
  email?: string;
  pixKeyType: string;
  pixKey: string;
  status: Status;
  bank?: string;
  agency?: string;
  accountType?: string;
  accountNumber?: string;
}

export type PixKeyType =
  | "EMAIL"
  | "CPF"
  | "CNPJ"
  | "TELEFONE"
  | "CHAVE_ALEATORIA";

export type Status = "RASCUNHO" | "VALIDADO";
