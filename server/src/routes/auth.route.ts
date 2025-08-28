import express from "express";
import { getMe, login, logout, signup } from "../controller/auth.controller";
import { productRoute } from "../middleware/productRoute";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", productRoute, getMe);

export default router;
