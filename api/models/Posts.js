import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";
import { Comments } from "./Comments.js";
import { DB_DIALECT } from "../config.js";

const idConfig = {
  type: DataTypes.UUID,
  primaryKey: true,
  allowNull: false,
};

if (DB_DIALECT === "mysql") {
  idConfig.defaultValue = DataTypes.UUIDV4; // Para MySQL puedes usar UUID como CHAR(36)
}

export const Posts = sequelize.define(
  "posts",
  {
    id: idConfig,
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
