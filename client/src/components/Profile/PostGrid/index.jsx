import { useState } from "react";

import PostModal from "@/components/PostModal";

import styles from "./PostGrid.module.css";

function PostGrid({ posts }) {
  const [selectedPost, setSelectedPost] = useState(null);

  if (!posts.length) {
    return (
      <div className={styles.empty}>
        <h3>No posts yet</h3>
        <p>When you share photos, they will appear here.</p>
      </div>
    );
  }

  return (
    <>
      <section className={styles.grid}>
        {posts.map((post) => (
          <article
            className={styles.post}
            key={post._id}
            onClick={() => setSelectedPost(post)}
          >
            {post.image ? (
              <img src={post.image} alt={post.caption || "Post"} />
            ) : (
              <div className={styles.textPost}>{post.caption}</div>
            )}
          </article>
        ))}
      </section>

      {selectedPost && (
        <PostModal post={selectedPost} onClose={() => setSelectedPost(null)} />
      )}
    </>
  );
}

export default PostGrid;
