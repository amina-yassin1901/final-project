import Like from "../models/Like.js";
export const toggleLike = async (req, res) => {
  try {
    const { postId } = req.params;
    const existingLike = await Like.findOne({
      user: req.user._id,
      post: postId,
    });

    if (existingLike) {
      await existingLike.deleteOne();

      return res.status(200).json({
        message: "Like removed",
      });
    }

    const like = new Like({
      user: req.user._id,
      post: postId,
    });

    await like.save();

    res.status(201).json({
      message: "Post liked",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const getPostLikes = async (req, res) => {
  try {
    const { postId } = req.params;

    const likes = await Like.find({ post: postId }).populate(
      "user",
      "username fullName profilePic",
    );

    res.status(200).json({
      likesCount: likes.length,
      likes,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
