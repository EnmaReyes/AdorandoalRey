import { DataTypes, HasMany } from "sequelize";
import { sequelize } from "../db.js";
import { Posts } from "./Posts.js";
import { Users } from "./Users.js";
import { DB_DIALECT } from "../config.js";

const idConfig = {
  type: DataTypes.UUID,
  primaryKey: true,
  allowNull: false,
};

if (DB_DIALECT === "mysql") {
  idConfig.defaultValue = DataTypes.UUIDV4; // Para MySQL puedes usar UUID como CHAR(36)
}
export const Heart = sequelize.define(
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
