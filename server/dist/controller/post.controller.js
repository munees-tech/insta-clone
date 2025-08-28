"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentOnPost = exports.getPost = exports.likeUnlikePost = exports.deletePost = exports.addPost = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const post_model_1 = __importDefault(require("../models/post.model"));
const clodinary_1 = __importDefault(require("../lib/clodinary"));
const addPost = async (req, res) => {
    try {
        const { description } = req.body;
        let { img } = req.body;
        if (img) {
            const uploaderResponse = await clodinary_1.default.uploader.upload(img);
            img = uploaderResponse.secure_url;
        }
        const userId = req.user?.id;
        const user = await user_model_1.default.findOne({ where: { id: userId } });
        if (!user) {
            res.status(404).json({ message: "user not found" });
        }
        const newPost = await post_model_1.default.create({
            userId,
            description,
            img,
        });
        res.status(200).json({ newPost });
    }
    catch (error) {
        console.log(`Error in addPost Controller ${error}`);
        res.status(500).json({ message: "server error" });
    }
};
exports.addPost = addPost;
const deletePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.user?.id;
        const user = await user_model_1.default.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const post = await post_model_1.default.findOne({ where: { id: postId } });
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        await post_model_1.default.destroy({ where: { id: postId } });
        return res.status(200).json({ message: "Deleted Succesfully" });
    }
    catch (error) {
        console.log(`Error in likeUnlike Controller ${error}`);
        res.status(500).json({ message: "server error" });
    }
};
exports.deletePost = deletePost;
const likeUnlikePost = async (req, res) => {
    try {
        const userId = req.user?.id;
        const postId = req.params.id;
        const post = await post_model_1.default.findOne({ where: { id: postId } });
        if (!post) {
            res.status(404).json({ message: "post not found" });
        }
        let like = post?.get("like");
        if (!Array.isArray(like)) {
            like = [];
        }
        const userLikePost = like.includes(userId);
        if (userLikePost) {
            like = like.filter((id) => id !== userId);
            await post_model_1.default.update({ like }, { where: { id: postId } });
            return res.status(200).json({ message: "unliked succesfully" });
        }
        else {
            like.push(userId);
            await post_model_1.default.update({ like }, { where: { id: postId } });
            return res.status(200).json({ message: "liked succesfully" });
        }
    }
    catch (error) {
        console.log(`Error in likeUnlike Controller ${error}`);
        res.status(500).json({ message: "server error" });
    }
};
exports.likeUnlikePost = likeUnlikePost;
const getPost = async (req, res) => {
    try {
        const post = await post_model_1.default.findAll({
            order: [["createdAt", "DESC"]],
            include: {
                model: user_model_1.default,
                as: "user",
                attributes: { exclude: ["password"] },
            },
        });
        res.status(200).json(post);
    }
    catch (error) {
        console.log(`Error in getPost Controller ${error}`);
        res.status(500).json({ message: "server error" });
    }
};
exports.getPost = getPost;
const commentOnPost = async (req, res) => {
    try {
        const { text } = req.body;
        const userId = req.user?.id;
        const postId = req.params.id;
        const post = await post_model_1.default.findOne({ where: { id: postId } });
        if (!post) {
            return res.status(404).json({ message: "post not found" });
        }
        let comments = post.get("comment") || [];
        if (!Array.isArray(comments)) {
            comments = [];
        }
        const comment = { user: userId, text };
        comments.push(comment);
        await post_model_1.default.update({ comment: comments }, { where: { id: postId } });
        res.status(200).json({ message: "comment added succesfully" });
    }
    catch (error) {
        console.log(`Error in commentOn Controller ${error}`);
        res.status(500).json({ message: "server error" });
    }
};
exports.commentOnPost = commentOnPost;
