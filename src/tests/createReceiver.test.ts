import { Collection } from "mongodb";
import request from "supertest";
import { Application } from "express";
import { setupApp } from "../main/config/setupApp";
import { database } from "../main/config/setupDatabase";
import { getEnvVariables } from "@/main/config";

const {
  DB: { COLLECTION_NAME },
} = getEnvVariables();

let receiverCollection: Collection;
let app: Application;

describe("POST - /receivers", () => {
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

  it("should return 201 if correct data is passed", async () => {
    await request(app)
      .post("/api/receivers")
      .send({
        name: "test user",
        email: "VALID-EMAIL@MAIL.COM",
        document: "11111111115",
        pixKeyType: "CPF",
        pixKey: "11111111115",
      })
      .expect(201);
  });

  it("should return 201 if only pixKey and pixKeyType are passed", async () => {
    await request(app)
      .post("/api/receivers")
      .send({
        pixKeyType: "CPF",
        pixKey: "11111111115",
      })
      .expect(201);
  });

  it("should return 400 if pixKeyType is not passed", async () => {
    await request(app)
      .post("/api/receivers")
      .send({
        pixKeyType: "",
        pixKey: "11111111115",
      })
      .expect(400);
  });

  it("should return 400 if pixKeyType is invalid", async () => {
    await request(app)
      .post("/api/receivers")
      .send({
        pixKeyType: "invalid-type",
        pixKey: "11111111115",
      })
      .expect(400);
  });

  it("should return 400 if pixKey is not passed", async () => {
    await request(app)
      .post("/api/receivers")
      .send({
        pixKeyType: "CPF",
        pixKey: "",
      })
      .expect(400);
  });

  it("should return 400 if pixKey does not match pixKeyType", async () => {
    await request(app)
      .post("/api/receivers")
      .send({
        pixKeyType: "CPF",
        pixKey: "VALID-EMAIL@MAIL.COM",
      })
      .expect(400);

    await request(app)
      .post("/api/receivers")
      .send({
        pixKeyType: "EMAIL",
        pixKey: "11111111111",
      })
      .expect(400);

    await request(app)
      .post("/api/receivers")
      .send({
        pixKeyType: "CNPJ",
        pixKey: "VALID-EMAIL@MAIL.COM",
      })
      .expect(400);

    await request(app)
      .post("/api/receivers")
      .send({
        pixKeyType: "CHAVE_ALEATORIA",
        pixKey: "VALID-EMAIL@MAIL.COM",
      })
      .expect(400);
  });

  it("should return 400 if email is invalid", async () => {
    await request(app)
      .post("/api/receivers")
      .send({
        email: "invalid_email@email.com",
        pixKeyType: "CPF",
        pixKey: "11111111111",
      })
      .expect(400);
  });

  it("should return 400 if document is invalid", async () => {
    await request(app)
      .post("/api/receivers")
      .send({
        document: "invalid_document",
        pixKeyType: "CPF",
        pixKey: "11111111111",
      })
      .expect(400);
  });
});
