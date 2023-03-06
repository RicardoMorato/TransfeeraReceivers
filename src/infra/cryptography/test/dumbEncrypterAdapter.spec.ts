import { DumbEncrypterAdapter } from "../dumbEncrypterAdapter";

const makeSut = () => new DumbEncrypterAdapter();

describe("DumbEncrypterAdapter", () => {
  it("should return same value after calling encryption", async () => {
    const sut = makeSut();

    const value = "bacon";
    const result = await sut.encrypt("bacon");

    expect(result).toBe(value);
  });

  it("should return same value after calling decrypt", async () => {
    const sut = makeSut();

    const value = "bacon";
    const result = await sut.decrypt("bacon");

    expect(result).toBe(value);
  });
});
