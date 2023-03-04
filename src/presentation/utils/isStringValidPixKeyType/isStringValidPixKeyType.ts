import { PixKeyType } from "@/domain/models/Receiver";

export function isStringValidPixKeyType(
  string: PixKeyType
): string is PixKeyType {
  return (
    string === "CHAVE_ALEATORIA" ||
    string === "CNPJ" ||
    string === "CPF" ||
    string === "EMAIL" ||
    string === "TELEFONE"
  );
}
