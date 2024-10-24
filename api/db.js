import { Sequelize } from "sequelize";
import dotenv from "dotenv";

// Cargar variables de entorno según el modo (development o production)
if (process.env.NODE_ENV === "production") {
  dotenv.config({ path: "./.env.production" });
} else {
  dotenv.config({ path: "./.env" });
}

// Obtener variables de entorno
const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_DIALECT } =
  process.env;

// Configuración de Sequelize
const sequelizeConfig = {
  host: DB_HOST,
  dialect: DB_DIALECT, // Dialecto puede ser 'mysql' o 'postgres'
  port: DB_PORT,
};

export const sequelize = new Sequelize(
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  sequelizeConfig
);

// Probar la conexión
sequelize
  .authenticate()
  .then(() => console.log("Conexión exitosa con la base de datos"))
  .catch((err) => console.error("Error conectando con la base de datos:", err));
