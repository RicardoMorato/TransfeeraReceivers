import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Application = express();

const port: string | number = process.env.PORT || 8080;

app.get("/health", (req: Request, res: Response) => {
  res.send("Up");
});

app.listen(port, () => {
  console.log(`App is running on port ${port}!`);
});
