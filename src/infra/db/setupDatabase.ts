import dotenv from "dotenv";
import { DBHelper } from "./mongodb";

dotenv.config();

export const database = new DBHelper(process.env.DB_CONNECTION_URL);
