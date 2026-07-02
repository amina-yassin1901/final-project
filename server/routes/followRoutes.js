import express from "express";
import { followUser, unfollowUser } from "../controllers/followController.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

router.post("/:userId", protectRoute, followUser);
router.delete("/:userId", protectRoute, unfollowUser);

export default router;
