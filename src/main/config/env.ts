import dotenv from "dotenv";

dotenv.config();

interface EnvVariables {
  APP: {
    PORT: string | number;
    ENCRYPTION_SECRET_KEY: string;
    NODE_ENV: string;
  };
  DB: {
    CONNECTION_URL: string;
    COLLECTION_NAME: string;
  };
}

const env = process.env.NODE_ENV || "development"; // 'development' or 'testing'

const development: EnvVariables = {
  APP: {
    PORT: parseInt(process.env.DEV_APP_PORT) || 8080,
    ENCRYPTION_SECRET_KEY: process.env.ENCRYPTION_SECRECT_KEY || "development",
    NODE_ENV: process.env.NODE_ENV || "development",
  },
  DB: {
    CONNECTION_URL: process.env.DB_CONNECTION_URL || "localhost:5432",
    COLLECTION_NAME: process.env.DB_COLLECTION_NAME || "receivers",
  },
};

const testing: EnvVariables = {
  APP: {
    PORT: parseInt(process.env.DEV_APP_PORT) || 8080,
    ENCRYPTION_SECRET_KEY: process.env.ENCRYPTION_SECRECT_KEY || "testing",
    NODE_ENV: process.env.NODE_ENV || "testing",
  },
  DB: {
    CONNECTION_URL: process.env.TESTING_DB_CONNECTION_URL || "localhost:5432",
    COLLECTION_NAME: process.env.DB_COLLECTION_NAME || "receivers",
  },
};

const config = {
  development,
  testing,
};

export const getEnvVariables = (): EnvVariables => config[env];
