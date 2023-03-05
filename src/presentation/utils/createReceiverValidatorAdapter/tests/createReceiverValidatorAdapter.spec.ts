import { InvalidParamError, MissingParamError } from "@/presentation/errors";
import { CreateReceiverValidatorAdapter } from "../createReceiverValidatorAdapter";

const makeSut = (): CreateReceiverValidatorAdapter => {
  return new CreateReceiverValidatorAdapter();
};

const createLargeEmail = (): string => {
  let email = "";

  for (let i = 0; i < 300; i++) email += "A";

  email += "@A.com";

  return email;
};

describe("createReceiverValidatorAdapter", () => {
  const receiverData = {
    name: "valid_name",
    email: "VALID-EMAIL@MAIL.COM",
    document: "11111111111",
    pixKeyType: "EMAIL",
    pixKey: "VALID-EMAIL@MAIL.COM",
  };

  const request = {
    body: receiverData,
  };

  it("should return an error if required fields are not passed", () => {
    const sut = makeSut();

    const requiredFields = ["pixKeyType", "pixKey"];

    const requestWithoutField = (field: string) => {
      return { body: { ...request.body, [field]: "" } };
    };

    for (const field of requiredFields) {
      const result = sut.validate(requestWithoutField(field));

      expect(result).toEqual({
        error: new MissingParamError(field),
        isValid: false,
      });
    }
  });

  it("should return an error if email is not valid", () => {
    const sut = makeSut();

    const requestWithInvalidEmail = {
      body: { ...request.body, email: "a.com" },
    };

    const validationResult = sut.validate(requestWithInvalidEmail);

    expect(validationResult).toEqual({
      error: new InvalidParamError("email"),
      isValid: false,
    });
  });

  it("should return an error if email is larger than 250 characters", () => {
    const sut = makeSut();

    const requestWithInvalidEmail = {
      body: { ...request.body, email: createLargeEmail() },
    };

    const validationResult = sut.validate(requestWithInvalidEmail);

    expect(validationResult).toEqual({
      error: new InvalidParamError("email"),
      isValid: false,
    });
  });

  it("should return an error if document is not valid", () => {
    const sut = makeSut();

    const requestWithInvalidDocument = {
      body: { ...request.body, document: "a" },
    };

    const validationResult = sut.validate(requestWithInvalidDocument);

    expect(validationResult).toEqual({
      error: new InvalidParamError("document"),
      isValid: false,
    });
  });

  it("should return an error if pix key type is not valid", () => {
    const sut = makeSut();

    const requestWithInvalidPixKeyType = {
      body: { ...request.body, pixKeyType: "a" },
    };

    const validationResult = sut.validate(requestWithInvalidPixKeyType);

    expect(validationResult).toEqual({
      error: new InvalidParamError("pixKeyType"),
      isValid: false,
    });
  });

  it("should return an error if pix key is not valid", () => {
    const sut = makeSut();

    const requestWithInvalidPixKeyType = {
      body: { ...request.body, pixKey: "a" },
    };

    const validationResult = sut.validate(requestWithInvalidPixKeyType);

    expect(validationResult).toEqual({
      error: new InvalidParamError("pixKey"),
      isValid: false,
    });
  });

  it("should return a validated response if all fields are valid", () => {
    const sut = makeSut();

    const validationResult = sut.validate(request);

    expect(validationResult).toEqual({
      error: null,
      isValid: true,
    });
  });
});
