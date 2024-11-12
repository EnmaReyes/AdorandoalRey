import { DataTypes } from "sequelize";
import { sequelize } from "../db.mjs";
import { Posts } from "./Posts.mjs";
import { Comments } from "./Comments.mjs";
import { CommentsResponse } from "./CommentsResponse.mjs";
import { DB_DIALECT } from "../config.mjs";

const idConfig = {
  type: DataTypes.UUID,
  primaryKey: true,
  allowNull: false,
};

if (DB_DIALECT === "mysql") {
  idConfig.defaultValue = DataTypes.UUIDV4; // Para MySQL puedes usar UUID como CHAR(36)
}
export const Users = sequelize.define(
  "users",
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id: idConfig,
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
    lastName: {
      type: DataTypes.STRING,
    },
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
  targetKey: "id",
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
  targetKey: "id",
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
  targetKey: "id",
});
