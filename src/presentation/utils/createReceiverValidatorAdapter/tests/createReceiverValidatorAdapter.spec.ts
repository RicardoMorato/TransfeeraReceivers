import { InvalidParamError, MissingParamError } from "@/presentation/errors";
import { CreateReceiverValidatorAdapter } from "../createReceiverValidatorAdapter";

const makeSut = (): CreateReceiverValidatorAdapter => {
  return new CreateReceiverValidatorAdapter();
};

describe("createReceiverValidatorAdapter", () => {
  const receiverData = {
    name: "valid_name",
    email: "valid_email@mail.com",
    document: "11111111111",
    pixKeyType: "EMAIL",
    pixKey: "valid_email",
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
        errorType: "MISSING_PARAM",
        statusCode: 400,
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
      errorType: "INVALID_PARAM",
      statusCode: 400,
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
      errorType: "INVALID_PARAM",
      statusCode: 400,
    });
  });
});
