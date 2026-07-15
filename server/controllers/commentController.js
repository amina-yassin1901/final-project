import Comment from "../models/Comment.js";
import Notification from "../models/Notification.js";
import Post from "../models/Post.js";
export const addComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { text } = req.body;

    if (!text?.trim()) {
      return res.status(400).json({
        message: "Comment text is required",
      });
    }

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    const comment = new Comment({
      user: req.user._id,
      post: postId,
      text: text.trim(),
    });

    await comment.save();

    const savedComment = await Comment.findById(comment._id).populate(
      "user",
      "username fullName profilePic",
    );

    if (post.user.toString() !== req.user._id.toString()) {
      const notification = new Notification({
        recipient: post.user,
        sender: req.user._id,
        type: "comment",
        post: postId,
      });

      await notification.save();
    }

    res.status(201).json(savedComment);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const getPostComments = async (req, res) => {
  try {
    const { postId } = req.params;

    const comments = await Comment.find({ post: postId })
      .populate("user", "username fullName profilePic")
      .sort({ createdAt: -1 });

    res.status(200).json({
      commentsCount: comments.length,
      comments,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
