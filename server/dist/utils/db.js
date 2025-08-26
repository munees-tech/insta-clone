"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testConnection = void 0;
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const Db = new sequelize_1.Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : undefined,
    dialect: 'mysql'
});
const testConnection = async () => {
    try {
        await Db.authenticate();
        console.log('Database connected');
    }
    catch (error) {
        console.log(`Database Error ${error}`);
    }
};
exports.testConnection = testConnection;
(0, exports.testConnection)();
exports.default = Db;
