import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";
import { Comments } from "./Comments.js";

export const Posts = sequelize.define(
  "posts",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    desc: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [0, 50000000000], // Permite hasta 1 millón de caracteres
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
