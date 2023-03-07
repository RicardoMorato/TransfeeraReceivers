import request from "supertest";
import { Application } from "express";
import { setupApp } from "../main/config/setupApp";

let app: Application;

describe("POST - /receivers", () => {
  beforeAll(() => {
    app = setupApp();
  });

  it("should return 200 if correct data is passed", async () => {
    request(app)
      .post("/receivers")
      .send({
        name: "test user",
        email: "VALID-EMAIL@MAIL.COM",
        document: "11111111115",
        pixKeyType: "CPF",
        pixKey: "11111111115",
      })
      .expect(200);
  });

  it("should return 200 if only pixKey and pixKeyType are passed", async () => {
    request(app)
      .post("/receivers")
      .send({
        pixKeyType: "CPF",
        pixKey: "11111111115",
      })
      .expect(200);
  });

  it("should return 400 if pixKeyType is not passed", async () => {
    request(app)
      .post("/receivers")
      .send({
        pixKeyType: "",
        pixKey: "11111111115",
      })
      .expect(400);
  });

  it("should return 400 if pixKeyType is invalid", async () => {
    request(app)
      .post("/receivers")
      .send({
        pixKeyType: "invalid-type",
        pixKey: "11111111115",
      })
      .expect(400);
  });

  it("should return 400 if pixKey is not passed", async () => {
    request(app)
      .post("/receivers")
      .send({
        pixKeyType: "CPF",
        pixKey: "",
      })
      .expect(400);
  });

  it("should return 400 if pixKey does not match pixKeyType", async () => {
    request(app)
      .post("/receivers")
      .send({
        pixKeyType: "CPF",
        pixKey: "VALID-EMAIL@MAIL.COM",
      })
      .expect(400);

    request(app)
      .post("/receivers")
      .send({
        pixKeyType: "EMAIL",
        pixKey: "11111111111",
      })
      .expect(400);

    request(app)
      .post("/receivers")
      .send({
        pixKeyType: "CNPJ",
        pixKey: "VALID-EMAIL@MAIL.COM",
      })
      .expect(400);

    request(app)
      .post("/receivers")
      .send({
        pixKeyType: "CHAVE_ALEATORIA",
        pixKey: "VALID-EMAIL@MAIL.COM",
      })
      .expect(400);
  });

  it("should return 400 if email is invalid", async () => {
    request(app)
      .post("/receivers")
      .send({
        email: "invalid_email@email.com",
        pixKeyType: "CPF",
        pixKey: "11111111111",
      })
      .expect(400);
  });

  it("should return 400 if document is invalid", async () => {
    request(app)
      .post("/receivers")
      .send({
        document: "invalid_document",
        pixKeyType: "CPF",
        pixKey: "11111111111",
      })
      .expect(400);
  });
});
