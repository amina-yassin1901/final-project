import Like from "../models/Like.js";
import Notification from "../models/Notification.js";
import Post from "../models/Post.js";
export const toggleLike = async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

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

    if (post.user.toString() !== req.user._id.toString()) {
      const notification = new Notification({
        recipient: post.user,
        sender: req.user._id,
        type: "like",
        post: postId,
      });

      await notification.save();
    }

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
