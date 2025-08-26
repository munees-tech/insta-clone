"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const gendrateToken = async (userId, res) => {
    try {
        const token = await jsonwebtoken_1.default.sign({ id: userId }, process.env.JWT_SECREATE, {
            expiresIn: "7d",
        });
        if (!token) {
            return res.status(400).json({ message: "unautharized" });
        }
        res.cookie("jwt", token, {
            maxAge: 7 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV !== "development",
        });
    }
    catch (error) {
        console.log(`Error in gendrateToken ${error}`);
    }
};
exports.default = gendrateToken;
