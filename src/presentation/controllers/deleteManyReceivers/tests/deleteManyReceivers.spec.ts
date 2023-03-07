import { ServerError } from "@/presentation/errors";
import { makeSut, receivers } from "./testUtils";

describe("deleteManyReceiversController", () => {
  const request = {
    body: {
      ids: ["valid_test_id", "valid_id", "new_valid_id"],
    },
  };

  it("should call delete receivers correctly", async () => {
    const { sut, deleteReceiverStub } = makeSut();
    const deleteReceiversSpy = jest.spyOn(deleteReceiverStub, "deleteMany");

    await sut.handle(request);

    expect(deleteReceiversSpy).toHaveBeenCalledTimes(1);
  });

  it("should return 500 if delete receivers throws", async () => {
    const { sut, deleteReceiverStub } = makeSut();
    jest.spyOn(deleteReceiverStub, "deleteMany").mockImplementationOnce(() => {
      throw new Error();
    });

    const response = await sut.handle(request);

    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual(new ServerError(""));
  });

  it("should return 200 with all deleted receivers if no error occurs", async () => {
    const { sut } = makeSut();

    const response = await sut.handle(request);

    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual({
      data: {
        deletedReceivers: receivers,
      },
    });
  });
});
