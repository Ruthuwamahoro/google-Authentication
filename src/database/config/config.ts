const { Sequelize } = require("sequelize");
import dotenv from "dotenv";
dotenv.config();


// with URI
const sequelize = new Sequelize(process.env.DATABASE_URL)

export const testDbConnection = async () => {
    try {
      await sequelize.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  };

interface DBConfig {
  username: string;
  password: string;
  database: string;
  host: string;
  port: string;
  dialect: "postgres";
  logging: boolean;
}

const development: DBConfig = {
  username: process.env.DB_USER!,
  password: process.env.DB_PASSWORD!,
  database: process.env.DB_NAME!,
  host: process.env.DB_HOST!,
  port: process.env.DB_PORT!,
  dialect: "postgres",
  logging: false,
};

const test: DBConfig = {
  username: process.env.DB_USER!,
  password: process.env.DB_PASSWORD!,
  database: process.env.DB_NAME!,
  host: process.env.DB_HOST!,
  port: process.env.DB_PORT!,
  dialect: "postgres",
  logging: false,
};

interface ProductionStagingConfig {
  use_env_variable: string;
  dialect: "postgres";
  dialectOptions: {
    ssl: {
      require: boolean;
      rejectUnauthorized: boolean;
    };
  };
}

const production: ProductionStagingConfig = {
  use_env_variable: "DATABASE_URL",
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: false,
      rejectUnauthorized: false,
    },
  },
};

const staging: ProductionStagingConfig = {
  use_env_variable: "DATABASE_URL",
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: false,
      rejectUnauthorized: false,
    },
  },
};

const config = {
  development,
  test,
  production,
  staging,
};

export default { sq: sequelize};