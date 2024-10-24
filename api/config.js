import dotenv from "dotenv";

dotenv.config();

export const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

export const DB_HOST =
  process.env.NODE_ENV === "production"
    ? process.env.PROD_DB_HOST
    : process.env.DB_HOST || "localhost";
export const DB_USER =
  process.env.NODE_ENV === "production"
    ? process.env.PROD_DB_USER
    : process.env.DB_USER || "postgres";
export const DB_NAME =
  process.env.NODE_ENV === "production"
    ? process.env.PROD_DB_NAME
    : process.env.DB_NAME || "adorandoalrey";
export const DB_PASSWORD =
  process.env.NODE_ENV === "production"
    ? process.env.PROD_DB_PASSWORD
    : process.env.DB_PASSWORD || "Enma2707";
export const DB_PORT =
  process.env.NODE_ENV === "production"
    ? process.env.PROD_DB_PORT
    : process.env.DB_PORT || 5432;
export const DB_URL =
  process.env.NODE_ENV === "production"
    ? process.env.PROD_DB_URL
    : process.env.DB_URL ||
      "postgresql://adorandoalreydb_owner:1Pz0DSnWbLEf@ep-delicate-limit-a64jjra0.us-west-2.aws.neon.tech/adorandoalreydb?sslmode=require";
export const DB_DIALECT =
  process.env.NODE_ENV === "productio"
    ? (process.env.DB_DIALECT = "mysql")
    : (process.env.DB_DIALECT = "postgres");
