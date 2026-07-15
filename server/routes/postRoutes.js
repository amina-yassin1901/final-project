import express from "express";
import protectRoute from "../middlewares/protectRoute.js";
import upload from "../middlewares/upload.js";
import {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  getExplorePosts,
  getUserPosts,
} from "../controllers/postController.js";

const router = express.Router();

router.post("/create", protectRoute, upload.single("image"), createPost);
router.get("/", getAllPosts);
router.get("/explore", getExplorePosts);
router.get("/user/:userId", getUserPosts);
router.get("/:id", getPostById);
router.put("/:id", protectRoute, upload.single("image"), updatePost);
router.delete("/:id", protectRoute, deletePost);

export default router;
