import "module-alias/register";
import { getEnvVariables } from "./config";

import { setupApp } from "./config/setupApp";
import { setupDatabase } from "./config/setupDatabase";

const {
  APP: { PORT, NODE_ENV },
} = getEnvVariables();

const start = async () => {
  await setupDatabase();

  const app = await setupApp();

  app.listen(PORT, () => {
    console.log(
      `====> App is running on port ${PORT} with ${NODE_ENV} configs ✅`
    );
  });
};

start();
