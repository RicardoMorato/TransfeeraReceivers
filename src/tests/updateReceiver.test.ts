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

describe("PUT - /receivers", () => {
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

  it("should return 204 if correct data is passed", async () => {
    const {
      body: { id },
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
      .put("/api/receivers")
      .send({
        id: id,
        document: "045.587.682-82",
        email: "FRODO-EMAIL@MAIL.COM",
        pixKeyType: "CPF",
        pixKey: "11111111111",
        status: "RASCUNHO",
        name: "Frodo Baggins",
      })
      .expect(204);
  });

  it("should return 400 if id is not passed", async () => {
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

    await request(app)
      .put("/api/receivers")
      .send({
        document: "045.587.682-82",
        email: "FRODO-EMAIL@MAIL.COM",
        pixKeyType: "CPF",
        pixKey: "11111111111",
        status: "RASCUNHO",
        name: "Frodo Baggins",
      })
      .expect(400);
  });

  it("should return 404 if id is not found", async () => {
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

    await request(app)
      .put("/api/receivers")
      .send({
        id: "invalid_id",
        document: "045.587.682-82",
        email: "FRODO-EMAIL@MAIL.COM",
        pixKeyType: "CPF",
        pixKey: "11111111111",
        status: "RASCUNHO",
        name: "Frodo Baggins",
      })
      .expect(404);
  });

  it("should return 400 if pixKeyType is not passed", async () => {
    const {
      body: { id },
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
      .post("/api/receivers")
      .send({
        id,
        pixKeyType: "",
        pixKey: "11111111115",
      })
      .expect(400);
  });

  it("should return 400 if pixKeyType is invalid", async () => {
    const {
      body: { id },
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
      .post("/api/receivers")
      .send({
        id,
        pixKeyType: "invalid-type",
        pixKey: "11111111115",
      })
      .expect(400);
  });

  it("should return 400 if pixKey is not passed", async () => {
    const {
      body: { id },
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
      .post("/api/receivers")
      .send({
        id,
        pixKeyType: "CPF",
        pixKey: "",
      })
      .expect(400);
  });

  it("should return 400 if pixKey does not match pixKeyType", async () => {
    const {
      body: { id },
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
      .post("/api/receivers")
      .send({
        id,
        pixKeyType: "CPF",
        pixKey: "VALID-EMAIL@MAIL.COM",
      })
      .expect(400);

    await request(app)
      .post("/api/receivers")
      .send({
        id,
        pixKeyType: "EMAIL",
        pixKey: "11111111111",
      })
      .expect(400);

    await request(app)
      .post("/api/receivers")
      .send({
        id,
        pixKeyType: "CNPJ",
        pixKey: "VALID-EMAIL@MAIL.COM",
      })
      .expect(400);

    await request(app)
      .post("/api/receivers")
      .send({
        id,
        pixKeyType: "CHAVE_ALEATORIA",
        pixKey: "VALID-EMAIL@MAIL.COM",
      })
      .expect(400);
  });

  it("should return 400 if status is not RASCUNHO or VALIDADO", async () => {
    const {
      body: { id },
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
      .put("/api/receivers")
      .send({
        id: id,
        document: "045.587.682-82",
        email: "FRODO-EMAIL@MAIL.COM",
        pixKeyType: "CPF",
        pixKey: "11111111111",
        status: "INVALID-STATUS",
        name: "Frodo Baggins",
      })
      .expect(400);
  });

  it("should return 400 if email is invalid", async () => {
    const {
      body: { id },
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
      .post("/api/receivers")
      .send({
        id,
        email: "invalid_email@email.com",
        pixKeyType: "CPF",
        pixKey: "11111111111",
      })
      .expect(400);
  });

  it("should return 400 if document is invalid", async () => {
    const {
      body: { id },
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
      .post("/api/receivers")
      .send({
        id,
        document: "invalid_document",
        pixKeyType: "CPF",
        pixKey: "11111111111",
      })
      .expect(400);
  });
});
