import { PixKeyType } from "@/domain/models/Receiver";
import { isStringValidPixKeyType } from "../isStringValidPixKeyType";

describe("isStringValidPixKeyType", () => {
  it("should return false if string is not one of Pix Key Type", () => {
    const result = isStringValidPixKeyType("PIX_KEY" as PixKeyType);

    expect(result).toBe(false);
  });

  it("should return false if string is email", () => {
    const result = isStringValidPixKeyType("email" as PixKeyType);

    expect(result).toBe(false);
  });

  it("should return true if string is EMAIL", () => {
    const result = isStringValidPixKeyType("EMAIL");

    expect(result).toBe(true);
  });

  it("should return false if string is cpf", () => {
    const result = isStringValidPixKeyType("cpf" as PixKeyType);

    expect(result).toBe(false);
  });

  it("should return true if string is CPF", () => {
    const result = isStringValidPixKeyType("CPF");

    expect(result).toBe(true);
  });

  it("should return false if string is cnpj", () => {
    const result = isStringValidPixKeyType("cnpj" as PixKeyType);

    expect(result).toBe(false);
  });

  it("should return true if string is CNPJ", () => {
    const result = isStringValidPixKeyType("CNPJ");

    expect(result).toBe(true);
  });

  it("should return false if string is telefone", () => {
    const result = isStringValidPixKeyType("telefone" as PixKeyType);

    expect(result).toBe(false);
  });

  it("should return true if string is TELEFONE", () => {
    const result = isStringValidPixKeyType("TELEFONE");

    expect(result).toBe(true);
  });

  it("should return false if string is chave_aleatoria", () => {
    const result = isStringValidPixKeyType("chave_aleatoria" as PixKeyType);

    expect(result).toBe(false);
  });

  it("should return true if string is CHAVE_ALEATORIA", () => {
    const result = isStringValidPixKeyType("CHAVE_ALEATORIA");

    expect(result).toBe(true);
  });
});
