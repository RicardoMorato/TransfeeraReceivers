import { validationPatterns } from "../validationPatterns";

describe("validationPatterns", () => {
  it("should match a valid uppercase email", () => {
    const validEmail = "VALID-EMAIL@MAIL.COM";

    const foundMatch = validEmail.match(validationPatterns.email);

    expect(foundMatch).not.toBeNull();
    expect(foundMatch).toBeTruthy();
  });

  it("should not match an invalid lowercase email", () => {
    const invalidEmail = "invalid_email@MAIL.COM";

    const foundMatch = invalidEmail.match(validationPatterns.email);

    expect(foundMatch).toBeNull();
    expect(foundMatch).toBeFalsy();
  });

  it("should not match an invalid email without @", () => {
    const invalidEmail = "INVALID-EMAIL.MAIL.COM";

    const foundMatch = invalidEmail.match(validationPatterns.email);

    expect(foundMatch).toBeNull();
    expect(foundMatch).toBeFalsy();
  });

  it("should match a valid cpf without special characters", () => {
    const validCpf = "11111111111";

    const foundMatch = validCpf.match(validationPatterns.cpf);

    expect(foundMatch).not.toBeNull();
    expect(foundMatch).toBeTruthy();
  });

  it("should match a valid cpf with special characters", () => {
    const validCpf = "111.111.111-11";

    const foundMatch = validCpf.match(validationPatterns.cpf);

    expect(foundMatch).not.toBeNull();
    expect(foundMatch).toBeTruthy();
  });

  it("should match a valid cpf with some special characters", () => {
    const validCpf = "111111.111-11";

    const foundMatch = validCpf.match(validationPatterns.cpf);

    expect(foundMatch).not.toBeNull();
    expect(foundMatch).toBeTruthy();
  });

  it("should not match an invalid cpf with less than 11 characters", () => {
    const invalidCpf = "111.1.111-11";

    const foundMatch = invalidCpf.match(validationPatterns.cpf);

    expect(foundMatch).toBeNull();
    expect(foundMatch).toBeFalsy();
  });

  it("should not match an invalid cpf with more than 11 characters", () => {
    const invalidCpf = "1111.1111.111-11";

    const foundMatch = invalidCpf.match(validationPatterns.cpf);

    expect(foundMatch).toBeNull();
    expect(foundMatch).toBeFalsy();
  });

  it("should match a valid cnpj with special characters", () => {
    const validCnpj = "11.111.111/1111-11";

    const foundMatch = validCnpj.match(validationPatterns.cnpj);

    expect(foundMatch).not.toBeNull();
    expect(foundMatch).toBeTruthy();
  });

  it("should match a valid cnpj without special characters", () => {
    const validCnpj = "11111111111111";

    const foundMatch = validCnpj.match(validationPatterns.cnpj);

    expect(foundMatch).not.toBeNull();
    expect(foundMatch).toBeTruthy();
  });

  it("should not match an invalid cnpj with less than 14 characters", () => {
    const invalidCnpj = "1111111/11";

    const foundMatch = invalidCnpj.match(validationPatterns.cnpj);

    expect(foundMatch).toBeNull();
    expect(foundMatch).toBeFalsy();
  });

  it("should not match an invalid cnpj with more than 14 characters", () => {
    const invalidCnpj = "1111111111111/111111";

    const foundMatch = invalidCnpj.match(validationPatterns.cnpj);

    expect(foundMatch).toBeNull();
    expect(foundMatch).toBeFalsy();
  });

  it("should match a valid phone with special characters and 55 at the beginning", () => {
    const validPhone = "+5599999999999";

    const foundMatch = validPhone.match(validationPatterns.phone);

    expect(foundMatch).not.toBeNull();
    expect(foundMatch).toBeTruthy();
  });

  it("should match a valid phone without 55 at the beginning", () => {
    const validPhone = "99999999999";

    const foundMatch = validPhone.match(validationPatterns.phone);

    expect(foundMatch).not.toBeNull();
    expect(foundMatch).toBeTruthy();
  });

  it("should match a valid phone with 55 at the beginning and without special characters", () => {
    const validPhone = "5599999999999";

    const foundMatch = validPhone.match(validationPatterns.phone);

    expect(foundMatch).not.toBeNull();
    expect(foundMatch).toBeTruthy();
  });

  it("should not match an invalid phone with less than 11 numbers", () => {
    const invalidPhone = "99999999";

    const foundMatch = invalidPhone.match(validationPatterns.phone);

    expect(foundMatch).toBeNull();
    expect(foundMatch).toBeFalsy();
  });

  it("should not match an invalid phone with more than 11 numbers", () => {
    const invalidPhone = "99999999999999999";

    const foundMatch = invalidPhone.match(validationPatterns.phone);

    expect(foundMatch).toBeNull();
    expect(foundMatch).toBeFalsy();
  });

  it("should not match an invalid phone with letters in it", () => {
    const invalidPhone = "99c99b99a99";

    const foundMatch = invalidPhone.match(validationPatterns.phone);

    expect(foundMatch).toBeNull();
    expect(foundMatch).toBeFalsy();
  });

  it("should match a valid random key", () => {
    const validRandomKey = "2a2a2a2a-2a2a-2a2a-2a2a-2a2a2a2a2a2a";

    const foundMatch = validRandomKey.match(validationPatterns.randomKey);

    expect(foundMatch).not.toBeNull();
    expect(foundMatch).toBeTruthy();
  });

  it("should match a valid random key with uppercase letters", () => {
    const validRandomKey = "2A2A2A2A-2A2A-2B2B-2B2B-2B2a2a2a2a2a";

    const foundMatch = validRandomKey.match(validationPatterns.randomKey);

    expect(foundMatch).not.toBeNull();
    expect(foundMatch).toBeTruthy();
  });

  it("should not match an invalid random key with more than 32 characters", () => {
    const invalidRandomKey =
      "22a2a2a2a-22a2a-12a2a-122a2a-2a2a2a2a2a2a12312313212";

    const foundMatch = invalidRandomKey.match(validationPatterns.randomKey);

    expect(foundMatch).toBeNull();
    expect(foundMatch).toBeFalsy();
  });

  it("should not match an invalid random key with less than 32 characters", () => {
    const invalidRandomKey = "22a2a-22a2a-12a2a-122a2a-2a2a2a2a2a2a";

    const foundMatch = invalidRandomKey.match(validationPatterns.randomKey);

    expect(foundMatch).toBeNull();
    expect(foundMatch).toBeFalsy();
  });

  it("should not match an invalid random key without the -", () => {
    const invalidRandomKey = "2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a";

    const foundMatch = invalidRandomKey.match(validationPatterns.randomKey);

    expect(foundMatch).toBeNull();
    expect(foundMatch).toBeFalsy();
  });

  it("should not match an invalid random key with letters after f", () => {
    const invalidRandomKey = "2g2h2i2j-2a2a-2a2a-2a2a-2a2a2a2a2a2a";

    const foundMatch = invalidRandomKey.match(validationPatterns.randomKey);

    expect(foundMatch).toBeNull();
    expect(foundMatch).toBeFalsy();
  });
});
