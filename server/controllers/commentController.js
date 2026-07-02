import Comment from "../models/Comment.js";
export const addComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({
        message: "Comment text is required",
      });
    }

    const comment = new Comment({
      user: req.user._id,
      post: postId,
      text,
    });

    const savedComment = await comment.save();

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
