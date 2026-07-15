import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import ProfileStats from "../ProfileStats";

import styles from "./ProfileHeader.module.css";

function ProfileHeader() {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { stats } = useSelector((state) => state.profileStats);

  const avatar =
    user?.fullName?.charAt(0).toUpperCase() ||
    user?.username?.charAt(0).toUpperCase() ||
    "?";

  return (
    <section className={styles.header}>
      <div className={styles.avatarWrapper}>
        <div className={styles.avatar}>
          {user?.profilePic ? (
            <img src={user.profilePic} alt={`${user.username} profile`} />
          ) : (
            avatar
          )}
        </div>
      </div>

      <div className={styles.info}>
        <div className={styles.top}>
          <h2>{user?.username}</h2>

          <button onClick={() => navigate("/profile/edit")}>
            Edit profile
          </button>
        </div>

        <ProfileStats
          postsCount={stats.postsCount}
          followersCount={stats.followersCount}
          followingCount={stats.followingCount}
        />

        {user?.bio && <p className={styles.bio}>{user.bio}</p>}

        {user?.website && (
          <a href={user.website} target="_blank" rel="noreferrer">
            {user.website}
          </a>
        )}
      </div>
    </section>
  );
}

export default ProfileHeader;
