import { paginate } from "../utils";
import { receivers } from "./testUtils";

describe("Paginate", () => {
  it("should return correct response when not receiving all params", () => {
    const result = paginate(receivers);

    expect(result).toEqual({
      data: receivers.slice(0, 10),
      totalPages: 2,
    });
  });

  it("should return correct response when different page number is passed", () => {
    const result = paginate(receivers, 2);

    expect(result).toEqual({
      data: receivers.slice(10, 20),
      totalPages: 2,
    });
  });

  it("should return an empty array when page number is greater than total pages", () => {
    const result = paginate(receivers, 20);

    expect(result).toEqual({
      data: [],
      totalPages: 2,
    });
  });

  it("should return correct response when different page size is passed", () => {
    const result = paginate(receivers, 1, 30);

    expect(result.data.length).toBe(receivers.length);
    expect(result.totalPages).toBe(1);
  });
});
