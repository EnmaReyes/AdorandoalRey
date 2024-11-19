const { DataTypes } = require("sequelize");
const { sequelize } = require("../db.js");
const { Comments } = require("./Comments.js");
const { v4: uuidv4 } = require("uuid");

const CommentsResponse = sequelize.define(
  "commentsResponse",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: uuidv4,
    },
    comments: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

//! asociasion de los comentarioa a sus respuestas \\
Comments.hasMany(CommentsResponse, {
  foreignKey: "parentCommentId",
  as: "replies",
  sourceKey: "id",
  onDelete: "CASCADE",
});

CommentsResponse.belongsTo(Comments, {
  foreignKey: "parentCommentId",
  as: "replies",
  targetKe: "id",
});

module.exports = { CommentsResponse };
