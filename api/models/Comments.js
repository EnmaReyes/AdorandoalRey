import { DataTypes, HasMany } from "sequelize";
import { sequelize } from "../db.js";

  
export const Comments = sequelize.define(
    "comments",
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



