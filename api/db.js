import { Sequelize } from "sequelize";
import { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } from "./config.js";

const sequelizeConfig = {
  host: DB_HOST,
  dialect: "postgres",
  port: DB_PORT
};

if (process.env.NODE_ENV === 'production') {
  sequelizeConfig.dialectOptions = {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  };
}

export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, sequelizeConfig);
