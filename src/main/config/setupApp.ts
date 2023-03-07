import express, { Application } from "express";
import cors from "cors";

import { router } from "@/main/routes";

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use("/api", router);

export const setupApp = async (): Promise<Application> => app;
