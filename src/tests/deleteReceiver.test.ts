import request from "supertest";
import { Application } from "express";
import { setupApp } from "../main/config/setupApp";

let app: Application;

describe("DELETE - /receivers", () => {
  beforeAll(() => {
    app = setupApp();
  });

  it("should return 204 if receiver is found and deleted", async () => {
    const response = await request(app).post("/receivers").send({
      name: "test user",
      email: "VALID-EMAIL@MAIL.COM",
      document: "11111111115",
      pixKeyType: "CPF",
      pixKey: "11111111115",
    });

    request(app).delete(`/receivers/${response.body.id}`).expect(204);
  });

  it("should return 404 if receiver is not found", async () => {
    const invalidId = "invalid_receiver_id";
    request(app).delete(`/receivers/${invalidId}`).expect(404);
  });
});
