import express from "express";

import {
  getNotifications,
  markNotificationAsRead,
} from "../controllers/notificationController.js";

import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

router.get("/", protectRoute, getNotifications);

router.patch("/:notificationId/read", protectRoute, markNotificationAsRead);

export default router;
