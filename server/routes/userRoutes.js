import express from "express";
import protectRoute from "../middlewares/protectRoute.js";
import {
  getMyProfile,
  updateProfile,
  searchUsers,
} from "../controllers/userController.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

router.get("/search", searchUsers);
router.get("/me", protectRoute, getMyProfile);
router.put("/update", protectRoute, upload.single("profilePic"), updateProfile);

export default router;
