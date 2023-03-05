import "module-alias/register";
import express, { Application } from "express";
import dotenv from "dotenv";

import { DBHelper as Database } from "@/infra/db";

dotenv.config();

const app: Application = express();

const port: string | number = process.env.PORT || 8080;

const database = new Database(process.env.DB_CONNECTION_URL);

database
  .connect()
  .then(async () => {
    console.log("====> Database connected successfully ✅");

    app.listen(port, () => {
      console.log(`====> App is running on port ${port} ✅`);
    });
  })
  .catch(console.error);
