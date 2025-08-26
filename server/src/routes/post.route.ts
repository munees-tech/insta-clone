import express from "express";
import {
  addPost,
  commentOnPost,
  deletePost,
  getPost,
  likeUnlikePost,
} from "../controller/post.controller";
import { productRoute } from "../middlewere/productRoute";

const router = express.Router();

router.post("/", productRoute, addPost);
router.delete("/:id", productRoute, deletePost);
router.get("/all", productRoute, getPost);
router.post("/like/:id", productRoute, likeUnlikePost);
router.post("/comment/:id", productRoute, commentOnPost);

export default router;
