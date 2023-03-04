import { MissingParamError } from "@/presentation/errors";
import { CreateReceiverValidatorAdapter } from "../createReceiverValidatorAdapter";

const makeSut = (): CreateReceiverValidatorAdapter => {
  return new CreateReceiverValidatorAdapter();
};

describe("createReceiverValidatorAdapter", () => {
  const receiverData = {
    name: "valid_name",
    email: "valid_email",
    document: "11111111111",
    pixKeyType: "EMAIL",
    pixKey: "valid_email",
  };

  const request = {
    body: receiverData,
  };

  it("should return an error if all required fields are not passed", () => {
    const sut = makeSut();

    const requiredFields = [
      "name",
      "document",
      "email",
      "pixKeyType",
      "pixKey",
    ];

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
});
