const { DataTypes, HasMany } = require("sequelize");
const { sequelize } = require("../db.js");
const { Posts } = require("./Posts.js");
const { Users } = require("./Users.js");
const { DB_DIALECT } = require("../config.js");

const idConfig = {
  type: DataTypes.UUID,
  primaryKey: true,
  allowNull: false,
};

if (DB_DIALECT === "mysql") {
  idConfig.defaultValue = DataTypes.UUIDV4; // Para MySQL puedes usar UUID como CHAR(36)
}
const Heart = sequelize.define(
  "heart",
  {
    id: idConfig,
    heart: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "heart",
    },
  },
  {
    timestamps: true,
  }
);
//! asociacion de likes al post\\
Posts.hasMany(Heart, {
  foreignKey: "postHeartId",
  sourceKey: "id",
  as: "hearts",
  onDelete: "CASCADE",
});

Heart.belongsTo(Posts, {
  foreignKey: "postHeartId",
  targetKey: "id",
  as: "hearts",
});

//! asociasion de likes con usuario\\
Users.hasMany(Heart, {
  foreignKey: "userHeartId",
  sourceKey: "id",
  as: "userHearts",
});

Heart.belongsTo(Users, {
  foreignKey: "userHeartId",
  targetKey: "id",
  as: "userHearts",
});

module.exports = {Heart};