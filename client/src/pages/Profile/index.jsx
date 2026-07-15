import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import ProfileHeader from "@/components/Profile/ProfileHeader/index.jsx";
import PostGrid from "@/components/Profile/PostGrid/index.jsx";

import { getUserPosts } from "@/redux/posts/postsSlice";
import { getProfileStats } from "@/redux/profileStats/profileStatsSlice";

import styles from "./Profile.module.css";

function Profile() {
  const dispatch = useDispatch();

  const { profilePosts } = useSelector((state) => state.posts);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const userId = user?._id || user?.id;

    if (userId) {
      dispatch(getUserPosts(userId));
      dispatch(getProfileStats(userId));
    }
  }, [dispatch, user]);

  return (
    <div className={styles.profile}>
      <ProfileHeader />

      <PostGrid posts={profilePosts} />
    </div>
  );
}

export default Profile;
