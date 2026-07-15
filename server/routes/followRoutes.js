import express from "express";
import {
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing,
  getFollowStatus,
} from "../controllers/followController.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

router.post("/:userId", protectRoute, followUser);
router.delete("/:userId", protectRoute, unfollowUser);
router.get("/followers/:userId", getFollowers);
router.get("/following/:userId", getFollowing);
router.get("/status/:userId", protectRoute, getFollowStatus);

export default router;
