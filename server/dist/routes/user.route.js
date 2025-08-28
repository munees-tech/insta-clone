"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const productRoute_1 = require("../middleware/productRoute");
const user_controller_1 = require("../controller/user.controller");
const router = express_1.default.Router();
const upload = (0, multer_1.default)();
router.get("/profile/:userName", productRoute_1.productRoute, user_controller_1.getUser);
router.post("/following/:userId", productRoute_1.productRoute, user_controller_1.follow);
router.post("/follower/", productRoute_1.productRoute, user_controller_1.unFollow);
router.get("/suggesteduser", productRoute_1.productRoute, user_controller_1.suggestUser);
// Keep the path `/profile` unchanged, but add `upload.single("img")` to handle the image
router.post("/profile", productRoute_1.productRoute, upload.single("img"), user_controller_1.updateProfile);
exports.default = router;
