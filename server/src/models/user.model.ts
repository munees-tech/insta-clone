import { DataTypes } from "sequelize";
import Db from "../utils/db";



const User = Db.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
     following: {
      type: DataTypes.JSON,
      allowNull:true
    },
    followers: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    img:{
      type:DataTypes.STRING,
      allowNull:true
    },
    bio:{
      type:DataTypes.STRING,
      allowNull:true
    }
  },
  { tableName: "user", timestamps: true }
);


export default User;
