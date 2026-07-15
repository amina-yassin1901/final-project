import User from "../models/User.js";
import Post from "../models/Post.js";
import Follow from "../models/Follow.js";

export const getMyProfile = async (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const { username, fullName, bio, website } = req.body;

    if (username !== undefined) user.username = username;
    if (fullName !== undefined) user.fullName = fullName;
    if (bio !== undefined) user.bio = bio;
    if (website !== undefined) user.website = website;
    if (req.file) {
      const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
      user.profilePic = base64Image;
    }
    const updatedUser = await user.save();
    const userWithoutPassword = await User.findById(updatedUser._id).select(
      "-password",
    );
    res.status(200).json({
      user: userWithoutPassword,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const searchUsers = async (req, res) => {
  try {
    const query = req.query.query?.trim();

    if (!query) {
      return res.status(200).json([]);
    }

    const users = await User.find({
      $or: [
        {
          username: {
            $regex: query,
            $options: "i",
          },
        },
        {
          fullName: {
            $regex: query,
            $options: "i",
          },
        },
      ],
    })
      .select("_id username fullName profilePic bio")
      .limit(20);

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const getProfileStats = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const postsCount = await Post.countDocuments({
      user: userId,
    });
    const followersCount = await Follow.countDocuments({
      following: userId,
    });

    const followingCount = await Follow.countDocuments({
      follower: userId,
    });

    res.status(200).json({
      postsCount,
      followersCount,
      followingCount,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
