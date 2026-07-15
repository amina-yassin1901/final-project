import express from "express";
import protectRoute from "../middlewares/protectRoute.js";
import {
  getMyProfile,
  updateProfile,
  searchUsers,
  getProfileStats,
  getUserById,
} from "../controllers/userController.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

router.get("/search", searchUsers);
router.get("/me", protectRoute, getMyProfile);
router.put("/update", protectRoute, upload.single("profilePic"), updateProfile);
router.get("/stats/:userId", getProfileStats);
router.get("/:userId", getUserById);

export default router;
