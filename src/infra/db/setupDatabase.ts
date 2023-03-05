import { DBHelper } from "./mongodb";
import { getEnvVariables } from "@/main/config";

const {
  DB: { CONNECTION_URL },
} = getEnvVariables();

export const database = new DBHelper(CONNECTION_URL);
