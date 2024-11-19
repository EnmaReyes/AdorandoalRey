const { DataTypes } = require("sequelize");
const { sequelize } = require("../db.js");
const { Comments } = require("./Comments.js");
const { v4: uuidv4 } = require("uuid");

const Posts = sequelize.define(
  "posts",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: uuidv4,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    desc: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [0, 1000000], // Permite hasta 1 millón de caracteres
      },
    },
    img: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
    },
    links: {
      type: DataTypes.JSON,
      defaultValue: {},
    },
  },
  {
    timestamps: false,
  }
);

//! asociasion de posts con comentarios \\
Posts.hasMany(Comments, {
  foreignKey: "postId",
  sourceKey: "id",
  as: "comments",
  onDelete: "CASCADE",
});

Comments.belongsTo(Posts, {
  foreignKey: "postId",
  targetKey: "id",
  as: "post",
});

module.exports = { Posts };
