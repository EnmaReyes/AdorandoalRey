const { DataTypes } = require("sequelize") ;
const { sequelize } = require ("../db.js");
const { DB_DIALECT } = require ("../config.js");

const idConfig = {
  type: DataTypes.UUID,
  primaryKey: true,
  allowNull: false,
};

if (DB_DIALECT === "mysql") {
  idConfig.defaultValue = DataTypes.UUIDV4; // Para MySQL puedes usar UUID como CHAR(36)
}

const Comments = sequelize.define(
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

module.exports = {Comments};