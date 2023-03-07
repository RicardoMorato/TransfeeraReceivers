import { DBHelper } from "@/infra/db/mongodb";
import { getEnvVariables } from "@/main/config";

const {
  DB: { CONNECTION_URL, COLLECTION_NAME },
} = getEnvVariables();

export const database = new DBHelper(CONNECTION_URL);

export const setupDatabase = async () => {
  await database
    .connect()
    .then(() => {
      console.log("====> Database connected successfully ✅");

      database.createTextIndex(COLLECTION_NAME);
    })
    .catch(console.error);
};
