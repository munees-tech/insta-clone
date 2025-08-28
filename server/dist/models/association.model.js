"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const post_model_1 = __importDefault(require("./post.model"));
const user_model_1 = __importDefault(require("./user.model"));
user_model_1.default.hasMany(post_model_1.default, { foreignKey: "userId", as: "posts" });
post_model_1.default.belongsTo(user_model_1.default, { foreignKey: "userId", as: "user" });
