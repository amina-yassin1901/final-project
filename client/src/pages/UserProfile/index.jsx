import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import PostGrid from "@/components/Profile/PostGrid";
import ProfileStats from "@/components/Profile/ProfileStats";

import { getUserByIdRequest } from "@/api/users";
import { getProfileStatsRequest } from "@/api/profileStats";
import { getUserPostsRequest } from "@/api/posts";

import {
  followUserRequest,
  getFollowStatusRequest,
  unfollowUserRequest,
} from "@/api/follows";

import styles from "./UserProfile.module.css";

const initialStats = {
  postsCount: 0,
  followersCount: 0,
  followingCount: 0,
};

function UserProfile() {
  const { userId } = useParams();
  const navigate = useNavigate();

  const { user: currentUser } = useSelector((state) => state.auth);

  const [profileUser, setProfileUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [stats, setStats] = useState(initialStats);

  const [isFollowing, setIsFollowing] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);

  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");

  const currentUserId = currentUser?._id || currentUser?.id;

  useEffect(() => {
    if (!userId) {
      setStatus("failed");
      setError("User ID is missing");
      return;
    }

    if (currentUserId && currentUserId.toString() === userId.toString()) {
      navigate("/profile", {
        replace: true,
      });

      return;
    }

    const loadProfile = async () => {
      try {
        setStatus("loading");
        setError("");

        const [
          userResponse,
          statsResponse,
          postsResponse,
          followStatusResponse,
        ] = await Promise.all([
          getUserByIdRequest(userId),
          getProfileStatsRequest(userId),
          getUserPostsRequest(userId),
          getFollowStatusRequest(userId),
        ]);

        setProfileUser(userResponse.data);
        setStats(statsResponse.data);
        setPosts(postsResponse.data);
        setIsFollowing(followStatusResponse.data.isFollowing);

        setStatus("succeeded");
      } catch (error) {
        console.error("Failed to load profile:", error);

        setStatus("failed");
        setError(
          error.response?.data?.message || "Failed to load user profile",
        );
      }
    };

    loadProfile();
  }, [userId, currentUserId, navigate]);

  const handleFollowToggle = async () => {
    if (followLoading) {
      return;
    }

    try {
      setFollowLoading(true);
      setError("");

      if (isFollowing) {
        await unfollowUserRequest(userId);

        setIsFollowing(false);

        setStats((previousStats) => ({
          ...previousStats,
          followersCount: Math.max(0, previousStats.followersCount - 1),
        }));
      } else {
        await followUserRequest(userId);

        setIsFollowing(true);

        setStats((previousStats) => ({
          ...previousStats,
          followersCount: previousStats.followersCount + 1,
        }));
      }
    } catch (error) {
      setError(
        error.response?.data?.message || "Failed to update follow status",
      );
    } finally {
      setFollowLoading(false);
    }
  };

  if (status === "loading") {
    return (
      <main className={styles.page}>
        <p className={styles.message}>Loading profile...</p>
      </main>
    );
  }

  if (status === "failed" || !profileUser) {
    return (
      <main className={styles.page}>
        <div className={styles.notFound}>
          <h1>Profile not available</h1>

          <p>{error || "User not found"}</p>

          <button type="button" onClick={() => navigate("/search")}>
            Back to search
          </button>
        </div>
      </main>
    );
  }

  const avatar =
    profileUser.fullName?.charAt(0).toUpperCase() ||
    profileUser.username?.charAt(0).toUpperCase() ||
    "?";

  return (
    <main className={styles.page}>
      <section className={styles.header}>
        <div className={styles.avatarWrapper}>
          <div className={styles.avatar}>
            {profileUser.profilePic ? (
              <img
                src={profileUser.profilePic}
                alt={`${profileUser.username} profile`}
              />
            ) : (
              avatar
            )}
          </div>
        </div>

        <div className={styles.info}>
          <div className={styles.top}>
            <h1>{profileUser.username}</h1>

            <button
              type="button"
              className={
                isFollowing ? styles.followingButton : styles.followButton
              }
              onClick={handleFollowToggle}
              disabled={followLoading}
            >
              {followLoading
                ? "Loading..."
                : isFollowing
                  ? "Following"
                  : "Follow"}
            </button>
          </div>

          <ProfileStats
            postsCount={stats.postsCount}
            followersCount={stats.followersCount}
            followingCount={stats.followingCount}
          />

          {profileUser.fullName && (
            <strong className={styles.fullName}>{profileUser.fullName}</strong>
          )}

          {profileUser.bio && <p className={styles.bio}>{profileUser.bio}</p>}

          {profileUser.website && (
            <a
              className={styles.website}
              href={profileUser.website}
              target="_blank"
              rel="noreferrer"
            >
              {profileUser.website}
            </a>
          )}
        </div>
      </section>

      {error && <p className={styles.actionError}>{error}</p>}

      <PostGrid posts={posts} />
    </main>
  );
}

export default UserProfile;
