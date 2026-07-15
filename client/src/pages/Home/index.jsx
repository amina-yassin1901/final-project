import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import PostCard from "@/components/PostCard/index";
import PostModal from "@/components/PostModal";

import { getAllPosts } from "@/redux/posts/postsSlice";

import styles from "./Home.module.css";

function Home() {
  const dispatch = useDispatch();

  const { feedPosts, status, error } = useSelector((state) => state.posts);

  const { user } = useSelector((state) => state.auth);

  const [selectedPost, setSelectedPost] = useState(null);

  const currentUserId = user?._id || user?.id;
  const isLoading = status === "loading";

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  return (
    <main className={styles.home}>
      {isLoading && feedPosts.length === 0 && (
        <p className={styles.message}>Loading posts...</p>
      )}

      {error && feedPosts.length === 0 && (
        <p className={styles.error}>{error}</p>
      )}

      {!isLoading && !error && feedPosts.length === 0 && (
        <div className={styles.empty}>
          <h2>No posts yet</h2>
          <p>Create the first post to see it in your feed.</p>
        </div>
      )}

      <section className={styles.feed}>
        {feedPosts.map((post) => (
          <PostCard
            key={post._id}
            post={post}
            currentUserId={currentUserId}
            onOpenPost={setSelectedPost}
          />
        ))}
      </section>

      {feedPosts.length > 0 && (
        <div className={styles.end}>
          <div className={styles.check}>✓</div>

          <strong>You&apos;ve seen all the updates</strong>

          <span>You&apos;ve viewed all new publications</span>
        </div>
      )}

      {selectedPost && (
        <PostModal post={selectedPost} onClose={() => setSelectedPost(null)} />
      )}
    </main>
  );
}

export default Home;
