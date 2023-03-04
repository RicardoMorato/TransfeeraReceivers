export interface ReceiverModel {
  id: string;
  name: string;
  document: string;
  email: string;
  pixKeyType: PixKeyType;
  pixKey: string;
  status: Status;
  bank?: string;
  agency?: string;
  accountType?: string;
  accountNumber?: string;
}

export enum PixKeyType {
  email = "EMAIL",
  cpf = "CPF",
  cnpj = "CNPJ",
  phone = "TELEFONE",
  randomKey = "CHAVE_ALEATORIA",
}

enum Status {
  draft = "RASCUNHO",
  validated = "VALIDADO",
}
