import { DataTypes } from "sequelize";
import { sequelize } from "../db.mjs";
import { DB_DIALECT } from "../config.mjs";

const idConfig = {
  type: DataTypes.UUID,
  primaryKey: true,
  allowNull: false,
};

if (DB_DIALECT === "mysql") {
  idConfig.defaultValue = DataTypes.UUIDV4; // Para MySQL puedes usar UUID como CHAR(36)
}

export const Comments = sequelize.define(
  "comments",
  {
    id: idConfig,
    comments: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);
