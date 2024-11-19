const { DataTypes } = require("sequelize");
const { sequelize } = require("../db.js");
const { Posts } = require("./Posts.js");
const { Comments } = require("./Comments.js");
const { CommentsResponse } = require("./CommentsResponse.js");
const { v4: uuidv4 } = require("uuid");

const Users = sequelize.define(
  "users",
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: uuidv4,
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
module.exports = { Users };
