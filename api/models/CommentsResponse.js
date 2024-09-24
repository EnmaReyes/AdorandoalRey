import { DataTypes, HasMany } from "sequelize";
import { sequelize } from "../db.js";
import { Users } from "./Users.js";
import { Comments } from "./Comments.js";

  
export const CommentsResponse = sequelize.define(
    "commentsResponse",
    {
        id:{
            type: DataTypes.UUID,
            primaryKey:true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false
        },
        comments:{
            type: DataTypes.TEXT,
            allowNull:false,
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
    onDelete: 'CASCADE'
  });

  CommentsResponse.belongsTo(Comments,{
    foreignKey: "parentCommentId",
    as: "replies",
    sourceKey: "id",
  });