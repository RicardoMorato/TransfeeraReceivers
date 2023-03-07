import { Collection } from "mongodb";
import request from "supertest";
import { Application } from "express";
import { setupApp } from "../main/config/setupApp";
import { database } from "@/main/config/setupDatabase";
import { getEnvVariables } from "@/main/config";

const {
  DB: { COLLECTION_NAME },
} = getEnvVariables();

let receiverCollection: Collection;
let app: Application;

describe("DELETE - /receivers", () => {
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

  it("should return 204 if receiver is found and deleted", async () => {
    const response = await request(app)
      .post("/api/receivers")
      .send({
        name: "test user",
        email: "VALID-EMAIL@MAIL.COM",
        document: "11111111115",
        pixKeyType: "CPF",
        pixKey: "11111111115",
      })
      .expect(201);

    await request(app).delete(`/api/receivers/${response.body.id}`).expect(204);
  });

  it("should return 404 if receiver is not found", async () => {
    const invalidId = "invalid_receiver_id";

    const response = await request(app)
      .delete(`/api/receivers/${invalidId}`)
      .expect(404);

    expect(response.text).toBe('{"error":"Not found"}');
  });
});

describe("POST - /receivers/delete-many", () => {
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

  it("should be able to delete many receivers", async () => {
    const {
      body: { id: id1 },
    } = await request(app)
      .post("/api/receivers")
      .send({
        name: "test user",
        email: "VALID-EMAIL@MAIL.COM",
        document: "11111111115",
        pixKeyType: "CPF",
        pixKey: "11111111115",
      })
      .expect(201);

    const {
      body: { id: id2 },
    } = await request(app)
      .post("/api/receivers")
      .send({
        name: "test user",
        email: "VALID-EMAIL@MAIL.COM",
        document: "11111111115",
        pixKeyType: "CPF",
        pixKey: "11111111115",
      })
      .expect(201);

    const {
      body: { id: id3 },
    } = await request(app)
      .post("/api/receivers")
      .send({
        name: "test user",
        email: "VALID-EMAIL@MAIL.COM",
        document: "11111111115",
        pixKeyType: "CPF",
        pixKey: "11111111115",
      })
      .expect(201);

    await request(app)
      .post("/api/receivers/delete-many")
      .send({
        ids: [id1, id2, id3],
      })
      .expect(200);
  });
});
