import { InvalidParamError } from "@/presentation/errors";
import { UpdateReceiverValidatorAdapter } from "../updateReceiverValidatorAdapter";

const makeSut = () => new UpdateReceiverValidatorAdapter();

describe("updateReceiverValidatorAdapter", () => {
  const receiverData = {
    id: "valid_id",
    name: "valid_name",
    email: "VALID-EMAIL@MAIL.COM",
    document: "11111111111",
    pixKeyType: "EMAIL",
    pixKey: "VALID-EMAIL@MAIL.COM",
    status: "RASCUNHO",
  };

  const request = {
    body: receiverData,
  };

  it("should return an error if status is not valid", () => {
    const sut = makeSut();

    const requestWithInvalidStatus = {
      body: { ...request.body, status: "invalid" },
    };

    const result = sut.validateUpdate(requestWithInvalidStatus);

    expect(result.isValid).toBeFalsy();
    expect(result.error).toStrictEqual(new InvalidParamError("status"));
  });

  it("should return an error if status is not passed", () => {
    const sut = makeSut();

    const requestWithInvalidStatus = {
      body: { ...request.body, status: "" },
    };

    const result = sut.validateUpdate(requestWithInvalidStatus);

    expect(result.isValid).toBeFalsy();
    expect(result.error).toStrictEqual(new InvalidParamError("status"));
  });

  it("should return type complete if status is 'RASCUNHO'", () => {
    const sut = makeSut();

    const requestWithInvalidStatus = {
      body: { ...request.body, status: "RASCUNHO" },
    };

    const result = sut.validateUpdate(requestWithInvalidStatus);

    expect(result.isValid).toBeTruthy();
    expect(result.error).toBeNull();
    expect(result.type).toBe("COMPLETE");
  });

  it("should return type ONLY-EMAIL if status is 'VALIDADO'", () => {
    const sut = makeSut();

    const requestWithInvalidStatus = {
      body: { ...request.body, status: "VALIDADO" },
    };

    const result = sut.validateUpdate(requestWithInvalidStatus);

    expect(result.isValid).toBeTruthy();
    expect(result.error).toBeNull();
    expect(result.type).toBe("ONLY-EMAIL");
  });
});
