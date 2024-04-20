import { Sequelize, HasMany } from "sequelize";

export const sequelize = new Sequelize(
  "adorandoalrey",
  "postgres",
  "Enma2707",
  {
    host: 'localhost',
    dialect: "postgres",
    port: "5432"
  }
);
