import { DataTypes, HasMany } from "sequelize";
import { sequelize } from "../db.js";
import { Posts } from "./Posts.js";
import { Users } from "./Users.js";

  
export const Heart = sequelize.define(
    "heart",
    {
        id:{
            type: DataTypes.UUID,
            primaryKey:true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false
        },
        heart: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'heart',
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
    targetId: "id",
    as: "userHearts",
  });
