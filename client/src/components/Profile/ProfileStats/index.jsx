import styles from "./ProfileStats.module.css";

function ProfileStats({ postsCount, followersCount, followingCount }) {
  return (
    <section className={styles.stats}>
      <div>
        <strong>{postsCount}</strong>
        <span>Posts</span>
      </div>

      <div>
        <strong>{followersCount}</strong>
        <span>Followers</span>
      </div>

      <div>
        <strong>{followingCount}</strong>
        <span>Following</span>
      </div>
    </section>
  );
}

export default ProfileStats;
