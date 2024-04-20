import { DataTypes, HasMany } from "sequelize";
import { sequelize } from "../db.js";
import { Posts } from "./Posts.js";
import { Comments } from "./Comments.js";
import { CommentsResponse } from "./CommentsResponse.js";

export const Users = sequelize.define(
  "users",
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      
    },
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    image: {
      type: DataTypes.TEXT,
    },
    name: {
      type: DataTypes.STRING,
    },
    lastName:{
      type: DataTypes.STRING,
    }
  },
  {
    timestamps: false,
  }
);

Users.hasMany(Posts, {
  foreignKey: "uid",
  as: "user",
  sourceKey: "id",
});

Posts.belongsTo(Users, {
  foreignKey: "uid",
  as: "user",
  targetId: "id",
});


//! usuarios que comentan en los posts\\
Users.hasMany(Comments, {
  foreignKey: "commenterId",
  as: "commenter",
  sourceKey: "id",
});

Comments.belongsTo(Users, {
  foreignKey: "commenterId",
  as: "commenter",
  targetId: "id",
});

//! asociasion de usuarios a las Respuestas de sus comentarios \\
Users.hasMany(CommentsResponse, {
  foreignKey: "uidComents",
  as: "userComments",
  sourceKey: "id",
});

CommentsResponse.belongsTo(Users, {
  foreignKey: "uidComents",
  as: "userComments",
  targetId: "id",
});