import Db from "../utils/db";
import { DataTypes } from "sequelize";

const Post = Db.define(
  "Post",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
      userId: {  
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    img: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    like: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    comment: {
      type: DataTypes.JSON,
      allowNull: true,
    },
  },
  { tableName: "post", timestamps: true }
);

export default Post;
