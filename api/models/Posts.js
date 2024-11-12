const { DataTypes } = require("sequelize");
const { sequelize } = require("../db.js");
const { Comments } = require("./Comments.js");
const { DB_DIALECT } = require("../config.js");


const idConfig = {
  type: DataTypes.UUID,
  primaryKey: true,
  allowNull: false,
};

if (DB_DIALECT === "mysql") {
  idConfig.defaultValue = DataTypes.UUIDV4; // Para MySQL puedes usar UUID como CHAR(36)
}

const Posts = sequelize.define(
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

module.exports = {Posts};