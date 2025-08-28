"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../utils/db"));
const sequelize_1 = require("sequelize");
const Post = db_1.default.define("Post", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    img: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    like: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: true,
    },
    comment: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: true,
    },
}, { tableName: "post", timestamps: true });
exports.default = Post;
