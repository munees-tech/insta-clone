"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfile = exports.suggestUser = exports.unFollow = exports.follow = exports.getUser = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const sequelize_1 = require("sequelize");
const clodinary_1 = __importDefault(require("../lib/clodinary"));
const getUser = async (req, res) => {
    try {
        const { userName } = req.params;
        const user = (await user_model_1.default.findOne({ where: { userName } }));
        if (!user) {
            res.status(404).json({ message: "user not found" });
        }
        res.status(200).json(user);
    }
    catch (error) {
        console.log(`Error in getUser Controller ${error}`);
        res.status(500).json({ message: "server error" });
    }
};
exports.getUser = getUser;
const follow = async (req, res) => {
    try {
        const { userId } = req.params;
        const currentUserId = req.user?.id;
        if (userId === currentUserId) {
            return res.status(400).json({ message: "Don't follow yourself" });
        }
        const user = (await user_model_1.default.findByPk(userId));
        const currentUser = (await user_model_1.default.findByPk(currentUserId));
        const currentFollowing = currentUser.following || [];
        if (currentFollowing.includes(Number(userId))) {
            return res.status(400).json({ message: "Already user followed" });
        }
        currentFollowing.push(userId);
        const userFollow = user?.followers || [];
        userFollow.push(currentUserId);
        await currentUser.update({ following: currentFollowing });
        await user.update({ followers: userFollow });
        return res.status(200).json({ message: "Followed succesfully" });
    }
    catch (error) {
        console.log(`Error in follow Controller ${error}`);
        res.status(500).json({ message: "server error" });
    }
};
exports.follow = follow;
const unFollow = async (req, res) => {
    try {
        const { userId, targetId } = req.body;
        if (userId === targetId) {
            res.status(403).json({ message: "You can't unfollow yourself" });
        }
        const user = (await user_model_1.default.findByPk(userId));
        const targetUser = (await user_model_1.default.findByPk(targetId));
        if (!user || !targetUser) {
            res.status(404).json({ message: "user not found !" });
        }
        const updateFollowing = await user.following.filter((id) => {
            id !== targetId;
        });
        const updateFollowers = await user.followers.filter((id) => {
            id !== userId;
        });
        await user.update({ following: updateFollowing });
        await targetUser.update({ followers: updateFollowers });
        return res.status(200).json({ message: "unFollowed succesfully" });
    }
    catch (error) {
        console.log(`Error in unFollow Controller ${error}`);
        res.status(500).json({ message: "server error" });
    }
};
exports.unFollow = unFollow;
const suggestUser = async (req, res) => {
    try {
        const suggestedUser = await user_model_1.default.findAll({
            order: [sequelize_1.Sequelize.literal("Rand()")],
            limit: 5,
        });
        res.status(200).json(suggestedUser);
    }
    catch (error) {
        console.log(`Error in suggestedUser Controller ${error}`);
        res.status(500).json({ message: "server error" });
    }
};
exports.suggestUser = suggestUser;
const updateProfile = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const user = (await user_model_1.default.findOne({ where: { id: userId } }));
        if (!user) {
            console.log("User not found for ID:", userId);
            return res.status(404).json({ message: "User not found" });
        }
        let img = user.img;
        const bio = req.body?.bio || "";
        if (req.file) {
            try {
                const uploadResponse = await clodinary_1.default.uploader.upload(req.file.path);
                img = uploadResponse.secure_url;
            }
            catch (uploadError) {
                console.error("Cloudinary upload error:", uploadError);
                return res
                    .status(500)
                    .json({ message: "Failed to upload image to Cloudinary" });
            }
        }
        const updatedUser = await user.update({ img, bio });
        res.status(200).json(updatedUser);
    }
    catch (error) {
        console.error("Error in updateProfile:", error);
        res.status(500).json({ message: "Server error" });
    }
};
exports.updateProfile = updateProfile;
