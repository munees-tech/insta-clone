import express from "express";
import multer from "multer";
import { productRoute } from "../middleware/productRoute";
import {
  follow,
  getUser,
  suggestUser,
  unFollow,
  updateProfile,
} from "../controller/user.controller";

const router = express.Router();

const upload = multer();

router.get("/profile/:userName", productRoute, getUser);
router.post("/following/:userId", productRoute, follow);
router.post("/follower/", productRoute, unFollow);
router.get("/suggesteduser", productRoute, suggestUser);

// Keep the path `/profile` unchanged, but add `upload.single("img")` to handle the image
router.post("/profile", productRoute, upload.single("img"), updateProfile);

export default router;
