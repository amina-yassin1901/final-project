import styles from "./ExploreGrid.module.css";

function ExploreGrid({ posts, onOpenPost }) {
  if (!posts.length) {
    return null;
  }

  return (
    <section className={styles.grid}>
      {posts.map((post, index) => {
        const isLarge = index % 10 === 2 || index % 10 === 6;

        return (
          <button
            type="button"
            key={post._id}
            className={`${styles.post} ${isLarge ? styles.large : ""}`}
            onClick={() => onOpenPost(post)}
          >
            {post.image ? (
              <img src={post.image} alt={post.caption || "Explore post"} />
            ) : (
              <div className={styles.textPost}>{post.caption}</div>
            )}

            <div className={styles.overlay}>
              <span>View post</span>
            </div>
          </button>
        );
      })}
    </section>
  );
}

export default ExploreGrid;
