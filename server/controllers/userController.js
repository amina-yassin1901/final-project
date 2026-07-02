import User from "../models/User.js";

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

    const { username, bio } = req.body;
    if (username) {
      user.username = username;
    }
    if (bio) {
      user.bio = bio;
    }
    if (req.file) {
      const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
      user.profilePic = base64Image;
    }
    const updatedUser = await user.save();
    const userWithoutPassword = await User.findById(updatedUser._id).select(
      "-password",
    );
    res.status(200).json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const searchUsers = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({
        message: "Search query is required",
      });
    }

    const users = await User.find({
      $or: [
        { username: { $regex: query, $options: "i" } },
        { fullName: { $regex: query, $options: "i" } },
      ],
    }).select("-password");

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
