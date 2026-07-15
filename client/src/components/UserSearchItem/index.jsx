import { useNavigate } from "react-router-dom";

import styles from "./UserSearchItem.module.css";

function UserSearchItem({ user }) {
  const navigate = useNavigate();

  const avatar =
    user?.fullName?.charAt(0).toUpperCase() ||
    user?.username?.charAt(0).toUpperCase() ||
    "?";

  const handleOpenProfile = () => {
    navigate(`/users/${user._id}`);
  };

  return (
    <button type="button" className={styles.item} onClick={handleOpenProfile}>
      <div className={styles.avatar}>
        {user.profilePic ? (
          <img src={user.profilePic} alt={`${user.username} profile`} />
        ) : (
          avatar
        )}
      </div>

      <div className={styles.info}>
        <strong>{user.username}</strong>

        <span>{user.fullName}</span>

        {user.bio && <p>{user.bio}</p>}
      </div>
    </button>
  );
}

export default UserSearchItem;
