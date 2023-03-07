import { Collection } from "mongodb";
import request from "supertest";
import { Application } from "express";
import { setupApp } from "@/main/config/setupApp";
import { database } from "@/main/config/setupDatabase";
import { getEnvVariables } from "@/main/config";

const {
  DB: { COLLECTION_NAME },
} = getEnvVariables();

let receiverCollection: Collection;
let app: Application;

describe("GET - /receivers", () => {
  beforeAll(async () => {
    app = await setupApp();
    await database.connect();
  });

  afterAll(async () => {
    await database.disconnect();
  });

  beforeEach(async () => {
    receiverCollection = database.getCollection(COLLECTION_NAME);
    await receiverCollection.deleteMany({});
  });

  it("should return 200 even with no data", async () => {
    const response = await request(app).get("/api/receivers").expect(200);

    expect(response.body).toHaveProperty("data");
    expect(response.body).toHaveProperty("totalPages");
  });
});

describe("GET - /receivers/:id", () => {
  beforeAll(async () => {
    app = await setupApp();
    await database.connect();
  });

  afterAll(async () => {
    await database.disconnect();
  });

  beforeEach(async () => {
    receiverCollection = database.getCollection(COLLECTION_NAME);
    await receiverCollection.deleteMany({});
  });

  it("should return 200 when passing valid id", async () => {
    const creationResponse = await request(app)
      .post("/api/receivers")
      .send({
        pixKeyType: "CPF",
        pixKey: "11111111115",
      })
      .expect(201);

    const response = await request(app)
      .get(`/api/receivers/${creationResponse.body.id}`)
      .expect(200);

    expect(response.body.data).toHaveProperty("_id");
    expect(response.body.data._id).toBe(creationResponse.body.id);
  });

  it("should return 404 when passing invalid id", async () => {
    const creationResponse = await request(app)
      .post("/api/receivers")
      .send({
        pixKeyType: "CPF",
        pixKey: "11111111115",
      })
      .expect(201);

    const response = await request(app)
      .get(`/api/receivers/${creationResponse.body.id}invalid_id`)
      .expect(404);

    expect(response.text).toBe('{"error":"Not found"}');
  });
});
