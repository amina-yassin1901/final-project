import Follow from "../models/Follow.js";
import User from "../models/User.js";

export const followUser = async (req, res) => {
  try {
    const { userId } = req.params;

    if (req.user._id.toString() === userId) {
      return res.status(400).json({
        message: "You cannot follow yourself",
      });
    }

    const userToFollow = await User.findById(userId);

    if (!userToFollow) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const existingFollow = await Follow.findOne({
      follower: req.user._id,
      following: userId,
    });

    if (existingFollow) {
      return res.status(400).json({
        message: "You are already following this user",
      });
    }

    const follow = new Follow({
      follower: req.user._id,
      following: userId,
    });

    await follow.save();

    res.status(201).json({
      message: "Successfully followed user",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const unfollowUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const follow = await Follow.findOne({
      follower: req.user._id,
      following: userId,
    });

    if (!follow) {
      return res.status(404).json({
        message: "Follow not found",
      });
    }

    await Follow.findByIdAndDelete(follow._id);

    res.status(200).json({
      message: "Successfully unfollowed user",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
