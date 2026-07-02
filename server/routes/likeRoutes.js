import express from "express";
import { toggleLike, getPostLikes } from "../controllers/likeController.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

router.post("/:postId", protectRoute, toggleLike);
router.get("/:postId", getPostLikes);

export default router;
