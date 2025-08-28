"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const post_controller_1 = require("../controller/post.controller");
const productRoute_1 = require("../middleware/productRoute");
const router = express_1.default.Router();
router.post("/", productRoute_1.productRoute, post_controller_1.addPost);
router.delete("/:id", productRoute_1.productRoute, post_controller_1.deletePost);
router.get("/all", productRoute_1.productRoute, post_controller_1.getPost);
router.post("/like/:id", productRoute_1.productRoute, post_controller_1.likeUnlikePost);
router.post("/comment/:id", productRoute_1.productRoute, post_controller_1.commentOnPost);
exports.default = router;
