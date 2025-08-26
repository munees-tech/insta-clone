"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoute = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../models/user.model"));
const productRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(400).json({ message: "Token not found" });
        }
        const decode = await jsonwebtoken_1.default.verify(token, process.env.JWT_SECREATE);
        if (!decode) {
            return res.status(400).json({ message: "Token unAutharized" });
        }
        const user = await user_model_1.default.findOne({
            where: { id: decode.id },
            attributes: { exclude: ["password"] },
        });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        req.user = user;
        next();
    }
    catch (error) {
        console.log(`Error in product route ${error}`);
        res.status(500).json({ message: "server error" });
    }
};
exports.productRoute = productRoute;
