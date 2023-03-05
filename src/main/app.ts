import "module-alias/register";
import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";

import { database } from "@/infra/db";
import { router } from "@/main/routes";

dotenv.config();

const app: Application = express();

const port: string | number = process.env.PORT || 8080;
const environment: string = process.env.NODE_ENV || "development";

app.use(cors());
app.use(express.json());
app.use("/api", router);

database
  .connect()
  .then(async () => {
    console.log("====> Database connected successfully ✅");

    app.listen(port, () => {
      console.log(
        `====> App is running on port ${port} with ${environment} configs ✅`
      );
    });
  })
  .catch(console.error);
