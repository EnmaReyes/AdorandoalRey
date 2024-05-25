import { Sequelize, HasMany } from "sequelize";
import {DB_HOST, DB_PORT,DB_USER, DB_PASSWORD, DB_NAME} from './config.js'

export const sequelize = new Sequelize(
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  {
    host: DB_HOST,
    dialect: "postgres",
    port: DB_PORT
  }
);
