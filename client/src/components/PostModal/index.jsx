import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostCommentsRequest, addCommentRequest } from "@/api/comments";
import { deletePost } from "@/redux/posts/postsSlice";
import { getProfileStats } from "@/redux/profileStats/profileStatsSlice";
import { getPostLikesRequest, toggleLikeRequest } from "@/api/likes";
import EditPostModal from "@/components/EditPostModal";

import styles from "./PostModal.module.css";

function PostModal({ post, onClose }) {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { status, error } = useSelector((state) => state.posts);

  const [showActions, setShowActions] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [displayedPost, setDisplayedPost] = useState(post);
  const [likesCount, setLikesCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentsCount, setCommentsCount] = useState(0);
  const [commentText, setCommentText] = useState("");
  const [commentLoading, setCommentLoading] = useState(false);
  const [commentError, setCommentError] = useState("");
  useEffect(() => {
    const loadLikes = async () => {
      try {
        const response = await getPostLikesRequest(displayedPost._id);

        setLikesCount(response.data.likesCount);

        const currentUserId = user?._id || user?.id;

        const likedByCurrentUser = response.data.likes.some((like) => {
          const likeUserId = like.user?._id || like.user;

          return likeUserId?.toString() === currentUserId?.toString();
        });

        setIsLiked(likedByCurrentUser);
      } catch (error) {
        console.error("Failed to load likes:", error);
      }
    };

    if (displayedPost?._id) {
      loadLikes();
    }
  }, [displayedPost?._id, user]);
  useEffect(() => {
    const loadComments = async () => {
      try {
        const response = await getPostCommentsRequest(displayedPost._id);

        setComments(response.data.comments);
        setCommentsCount(response.data.commentsCount);
      } catch (error) {
        console.error("Failed to load comments:", error);
      }
    };

    if (displayedPost?._id) {
      loadComments();
    }
  }, [displayedPost?._id]);
  if (!displayedPost) {
    return null;
  }

  const currentUserId = user?._id || user?.id;
  const postUserId = displayedPost.user?._id || displayedPost.user;

  const isOwner =
    currentUserId &&
    postUserId &&
    currentUserId.toString() === postUserId.toString();

  const isLoading = status === "loading";

  const avatar =
    displayedPost.user?.fullName?.charAt(0).toUpperCase() ||
    displayedPost.user?.username?.charAt(0).toUpperCase() ||
    "?";

  const handleDelete = async () => {
    const result = await dispatch(deletePost(displayedPost._id));

    if (deletePost.fulfilled.match(result)) {
      if (currentUserId) {
        dispatch(getProfileStats(currentUserId));
      }

      onClose();
    }
  };

  const handleOpenEdit = () => {
    setShowActions(false);
    setShowEditModal(true);
  };

  const handleUpdatedPost = (updatedPost) => {
    setDisplayedPost(updatedPost);
  };
  const handleLike = async () => {
    if (likeLoading) {
      return;
    }

    try {
      setLikeLoading(true);

      await toggleLikeRequest(displayedPost._id);

      if (isLiked) {
        setIsLiked(false);
        setLikesCount((prev) => Math.max(0, prev - 1));
      } else {
        setIsLiked(true);
        setLikesCount((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Failed to toggle like:", error);
    } finally {
      setLikeLoading(false);
    }
  };
  const handleAddComment = async (event) => {
    event.preventDefault();

    const trimmedText = commentText.trim();

    if (!trimmedText || commentLoading) {
      return;
    }

    try {
      setCommentLoading(true);
      setCommentError("");

      const response = await addCommentRequest(displayedPost._id, trimmedText);

      setComments((prevComments) => [response.data, ...prevComments]);

      setCommentsCount((prevCount) => prevCount + 1);
      setCommentText("");
    } catch (error) {
      setCommentError(error.response?.data?.message || "Failed to add comment");
    } finally {
      setCommentLoading(false);
    }
  };
  return (
    <div className={styles.overlay} onClick={onClose}>
      <button type="button" className={styles.closeBtn} onClick={onClose}>
        ×
      </button>

      <div
        className={styles.modal}
        onClick={(event) => event.stopPropagation()}
      >
        <div className={styles.imageBox}>
          {displayedPost.image ? (
            <img
              src={displayedPost.image}
              alt={displayedPost.caption || "Post"}
            />
          ) : (
            <div className={styles.textPost}>{displayedPost.caption}</div>
          )}
        </div>

        <div className={styles.info}>
          <div className={styles.user}>
            <div className={styles.userInfo}>
              <div className={styles.avatar}>
                {displayedPost.user?.profilePic ? (
                  <img
                    src={displayedPost.user.profilePic}
                    alt={displayedPost.user.username}
                  />
                ) : (
                  avatar
                )}
              </div>

              <strong>{displayedPost.user?.username}</strong>
            </div>

            {isOwner && (
              <button
                type="button"
                className={styles.moreBtn}
                onClick={() => setShowActions(true)}
              >
                •••
              </button>
            )}
          </div>

          {displayedPost.caption && (
            <p className={styles.caption}>
              <strong>{displayedPost.user?.username}</strong>{" "}
              {displayedPost.caption}
            </p>
          )}
          <div className={styles.comments}>
            {comments.length === 0 ? (
              <p className={styles.noComments}>No comments yet.</p>
            ) : (
              comments.map((comment) => {
                const commentAvatar =
                  comment.user?.fullName?.charAt(0).toUpperCase() ||
                  comment.user?.username?.charAt(0).toUpperCase() ||
                  "?";

                return (
                  <div className={styles.comment} key={comment._id}>
                    <div className={styles.commentAvatar}>
                      {comment.user?.profilePic ? (
                        <img
                          src={comment.user.profilePic}
                          alt={comment.user.username}
                        />
                      ) : (
                        commentAvatar
                      )}
                    </div>

                    <p>
                      <strong>{comment.user?.username}</strong> {comment.text}
                    </p>
                  </div>
                );
              })
            )}
          </div>
          <div className={styles.postActions}>
            <button
              type="button"
              className={`${styles.likeButton} ${isLiked ? styles.liked : ""}`}
              onClick={handleLike}
              disabled={likeLoading}
            >
              {isLiked ? "♥" : "♡"}
            </button>

            <span className={styles.likesCount}>
              {likesCount} {likesCount === 1 ? "like" : "likes"}
            </span>
          </div>
          <form className={styles.commentForm} onSubmit={handleAddComment}>
            <input
              type="text"
              value={commentText}
              onChange={(event) => setCommentText(event.target.value)}
              placeholder="Add a comment..."
              maxLength={300}
              disabled={commentLoading}
            />

            <button
              type="submit"
              disabled={!commentText.trim() || commentLoading}
            >
              {commentLoading ? "Posting..." : "Post"}
            </button>
          </form>

          {commentError && (
            <p className={styles.commentError}>{commentError}</p>
          )}
          {error && <p className={styles.error}>{error}</p>}
        </div>
      </div>

      {showActions && (
        <div
          className={styles.actionsOverlay}
          onClick={() => setShowActions(false)}
        >
          <div
            className={styles.actionsModal}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className={styles.deleteBtn}
              onClick={handleDelete}
              disabled={isLoading}
            >
              {isLoading ? "Deleting..." : "Delete"}
            </button>
            <button
              type="button"
              className={styles.editBtn}
              onClick={handleOpenEdit}
            >
              Edit
            </button>

            <button
              type="button"
              className={styles.cancelBtn}
              onClick={() => setShowActions(false)}
              disabled={isLoading}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {showEditModal && (
        <EditPostModal
          post={displayedPost}
          onClose={() => setShowEditModal(false)}
          onUpdated={handleUpdatedPost}
        />
      )}
    </div>
  );
}

export default PostModal;
