import { Sequelize, HasMany } from "sequelize";
import {DB_HOST, DB_PORT,DB_USER, DB_PASSWORD, DB_NAME, DB_URL} from './config.js'

export const sequelize = new Sequelize(DB_URL, {
  dialect: "postgres",
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});
