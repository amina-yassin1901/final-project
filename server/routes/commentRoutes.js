import express from "express";
import {
  addComment,
  getPostComments,
} from "../controllers/commentController.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

router.post("/:postId", protectRoute, addComment);
router.get("/:postId", getPostComments);

export default router;
