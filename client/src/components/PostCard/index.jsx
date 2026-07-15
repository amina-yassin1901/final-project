import { useEffect, useState } from "react";

import { getPostLikesRequest, toggleLikeRequest } from "@/api/likes";
import comm from "@/assets/icons/comm.svg";
import styles from "./PostCard.module.css";

function PostCard({ post, currentUserId, onOpenPost }) {
  const [likesCount, setLikesCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);

  const avatar =
    post.user?.fullName?.charAt(0).toUpperCase() ||
    post.user?.username?.charAt(0).toUpperCase() ||
    "?";

  useEffect(() => {
    const loadLikes = async () => {
      try {
        const response = await getPostLikesRequest(post._id);

        setLikesCount(response.data.likesCount);

        const likedByCurrentUser = response.data.likes.some((like) => {
          const likeUserId = like.user?._id || like.user;

          return likeUserId?.toString() === currentUserId?.toString();
        });

        setIsLiked(likedByCurrentUser);
      } catch (error) {
        console.error("Failed to load post likes:", error);
      }
    };

    loadLikes();
  }, [post._id, currentUserId]);

  const handleLike = async () => {
    if (likeLoading) {
      return;
    }

    try {
      setLikeLoading(true);

      await toggleLikeRequest(post._id);

      if (isLiked) {
        setIsLiked(false);
        setLikesCount((previousCount) => Math.max(0, previousCount - 1));
      } else {
        setIsLiked(true);
        setLikesCount((previousCount) => previousCount + 1);
      }
    } catch (error) {
      console.error("Failed to toggle like:", error);
    } finally {
      setLikeLoading(false);
    }
  };

  const formattedDate = new Date(post.createdAt).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
  });

  return (
    <article className={styles.card}>
      <header className={styles.header}>
        <div className={styles.author}>
          <div className={styles.avatar}>
            {post.user?.profilePic ? (
              <img src={post.user.profilePic} alt={post.user.username} />
            ) : (
              avatar
            )}
          </div>

          <div className={styles.authorText}>
            <strong>{post.user?.username}</strong>
            <span>{formattedDate}</span>
          </div>
        </div>

        <button
          type="button"
          className={styles.moreButton}
          aria-label="Post options"
        >
          •••
        </button>
      </header>

      <button
        type="button"
        className={styles.imageButton}
        onClick={() => onOpenPost(post)}
      >
        {post.image ? (
          <img
            src={post.image}
            alt={post.caption || "Post"}
            className={styles.image}
          />
        ) : (
          <div className={styles.textPost}>{post.caption}</div>
        )}
      </button>

      <div className={styles.actions}>
        <button
          type="button"
          className={`${styles.likeButton} ${isLiked ? styles.liked : ""}`}
          onClick={handleLike}
          disabled={likeLoading}
          aria-label={isLiked ? "Unlike post" : "Like post"}
        >
          {isLiked ? "♥" : "♡"}
        </button>

        <button
          type="button"
          className={styles.commentButton}
          onClick={() => onOpenPost(post)}
          aria-label="Open comments"
        >
          <img src={comm} />
        </button>
      </div>

      <div className={styles.details}>
        <strong className={styles.likes}>
          {likesCount} {likesCount === 1 ? "like" : "likes"}
        </strong>

        {post.caption && (
          <p className={styles.caption}>
            <strong>{post.user?.username}</strong> {post.caption}
          </p>
        )}

        <button
          type="button"
          className={styles.commentsLink}
          onClick={() => onOpenPost(post)}
        >
          View comments
        </button>
      </div>
    </article>
  );
}

export default PostCard;
