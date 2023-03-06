import { InvalidParamError } from "@/presentation/errors";
import { ListAllReceiversValidatorAdapter } from "../listAllReceiversValidatorAdapter";

const makeSut = () => {
  return new ListAllReceiversValidatorAdapter();
};

describe("ListAllReceiversValidatorAdapter", () => {
  it("should return an error if page number param is negative", () => {
    const sut = makeSut();

    const request = {
      params: {
        pageNumber: -1,
      },
    };

    const response = sut.validate(request);

    expect(response.isValid).toBe(false);
    expect(response.error).toStrictEqual(new InvalidParamError("pageNumber"));
  });

  it("should default page number to 1 if param is zero", () => {
    const sut = makeSut();

    const request = {
      params: {
        pageNumber: 0,
      },
    };

    const response = sut.validate(request);

    expect(response.isValid).toBe(true);
    expect(response.error).toBe(null);
  });

  it("should default page number to 1 if not provided", () => {
    const sut = makeSut();

    const request = {
      params: {},
    };

    const response = sut.validate(request);

    expect(response.isValid).toBe(true);
    expect(response.error).toBe(null);
    expect(request.params).toStrictEqual({ pageNumber: 1 });
  });

  it("should default page number to 1 if params are not provided", () => {
    const sut = makeSut();

    const request = {};

    const response = sut.validate(request);

    expect(response.isValid).toBe(true);
    expect(response.error).toBe(null);
    expect(request["params"]).toStrictEqual({ pageNumber: 1 });
  });
});
