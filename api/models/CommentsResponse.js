const { DataTypes } =require ("sequelize");
const { sequelize }  =require  ("../db.js");
const { Comments } =require ("./Comments.js");
const { DB_DIALECT } =require  ("../config.js");

const idConfig = {
  type: DataTypes.UUID,
  primaryKey: true,
  allowNull: false,
};

if (DB_DIALECT === "mysql") {
  idConfig.defaultValue = DataTypes.UUIDV4; // Para MySQL puedes usar UUID como CHAR(36)
}

const CommentsResponse = sequelize.define(
  "commentsResponse",
  {
    id: idConfig,
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

module.exports = {CommentsResponse};