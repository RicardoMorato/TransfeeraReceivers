import express, { Application } from "express";
import cors from "cors";

import { database } from "@/infra/db";
import { router } from "@/main/routes";
import { getEnvVariables } from "@/main/config";

const {
  APP: { PORT, NODE_ENV },
} = getEnvVariables();

const app: Application = express();

const port: string | number = PORT;

app.use(cors());
app.use(express.json());
app.use("/api", router);

export const setupApp = () => {
  database
    .connect()
    .then(async () => {
      console.log("====> Database connected successfully ✅");

      app.listen(port, () => {
        console.log(
          `====> App is running on port ${port} with ${NODE_ENV} configs ✅`
        );
      });
    })
    .catch(console.error);
};
