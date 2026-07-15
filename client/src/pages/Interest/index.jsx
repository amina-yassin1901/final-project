import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ExploreGrid from "@/components/ExploreGrid";
import PostModal from "@/components/PostModal";

import { getExplorePosts } from "@/redux/posts/postsSlice";

import styles from "./Interest.module.css";

function Interest() {
  const dispatch = useDispatch();

  const { explorePosts, status, error } = useSelector((state) => state.posts);

  const [selectedPost, setSelectedPost] = useState(null);

  const isLoading = status === "loading";

  useEffect(() => {
    dispatch(getExplorePosts());
  }, [dispatch]);

  return (
    <main className={styles.page}>
      {isLoading && explorePosts.length === 0 && (
        <p className={styles.message}>Loading posts...</p>
      )}

      {error && explorePosts.length === 0 && (
        <p className={styles.error}>{error}</p>
      )}

      {!isLoading && !error && explorePosts.length === 0 && (
        <div className={styles.empty}>
          <h1>No posts yet</h1>

          <p>Explore posts will appear here.</p>
        </div>
      )}

      <ExploreGrid posts={explorePosts} onOpenPost={setSelectedPost} />

      {selectedPost && (
        <PostModal post={selectedPost} onClose={() => setSelectedPost(null)} />
      )}
    </main>
  );
}

export default Interest;
