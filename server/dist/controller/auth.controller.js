"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = exports.logout = exports.login = exports.signup = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = __importDefault(require("../models/user.model"));
const gendrateToken_1 = __importDefault(require("../utils/gendrateToken"));
const signup = async (req, res) => {
    const { userName, email, password } = req.body;
    try {
        const existingUser = (await user_model_1.default.findOne({
            where: { email },
        }));
        if (existingUser) {
            res.status(400).json({ message: "User already exists" });
        }
        const hassedPassword = await bcrypt_1.default.hash(password, 10);
        const newUser = (await user_model_1.default.create({
            userName,
            email,
            password: hassedPassword,
        }));
        await (0, gendrateToken_1.default)(newUser.id, res);
        return res.status(200).json({
            message: "user created succesfully",
            user: { id: newUser.id, userName, email },
        });
    }
    catch (error) {
        console.log(`Error in signup controller ${error}`);
        return res.status(500).json({ message: "Server error" });
    }
};
exports.signup = signup;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = (await user_model_1.default.findOne({ where: { email } }));
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const isPasswordCorrect = await bcrypt_1.default.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Password doesn't matched" });
        }
        await (0, gendrateToken_1.default)(user?.id, res);
        res.status(200).json({
            id: user?.id,
            name: user?.name,
            email: user?.email,
        });
    }
    catch (error) {
        console.log(`Error in login Controller ${error}`);
        return res.status(500).json({ message: "Server error" });
    }
};
exports.login = login;
const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logout succesfully" });
    }
    catch (error) {
        console.log(`Error in logout Controller ${error}`);
        res.status(500).json({ message: "server error" });
    }
};
exports.logout = logout;
const getMe = async (req, res) => {
    try {
        const user = (await user_model_1.default.findOne({
            where: { id: req.user?.id },
            attributes: { exclude: ["password"] },
        }));
        res.status(200).json(req.user);
    }
    catch (error) {
        console.log(`Error in getMe controller ${error}`);
        res.status(500).json({ message: "server error" });
    }
};
exports.getMe = getMe;
