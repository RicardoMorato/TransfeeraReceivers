import { InvalidParamError } from "@/presentation/errors";
import { ListReceiversByFieldValidatorAdapter } from "../listReceiversByFieldValidatorAdapter";

const makeSut = () => new ListReceiversByFieldValidatorAdapter();

describe("ListReceiversByFieldValidatorAdapter", () => {
  it("should return an error if params are not passed", () => {
    const sut = makeSut();

    const request = {};

    const response = sut.validate(request);

    expect(response.isValid).toBe(false);
    expect(response.error).toStrictEqual(new InvalidParamError("params"));
  });

  it("should return an error if searchBy param is not passed", () => {
    const sut = makeSut();

    const request = {
      params: {},
    };

    const response = sut.validate(request);

    expect(response.isValid).toBe(false);
    expect(response.error).toStrictEqual(new InvalidParamError("searchBy"));
  });

  it("should return successfully if the searchBy param is passed", () => {
    const sut = makeSut();

    const request = {
      params: {
        searchBy: "test",
      },
    };

    const response = sut.validate(request);

    expect(response.isValid).toBe(true);
    expect(response.error).toBe(null);
  });
});
