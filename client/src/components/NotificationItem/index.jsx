import styles from "./NotificationItem.module.css";

function NotificationItem({ notification, onNotificationClick }) {
  const sender = notification.sender;

  const avatar =
    sender?.fullName?.charAt(0).toUpperCase() ||
    sender?.username?.charAt(0).toUpperCase() ||
    "?";

  const getNotificationText = () => {
    switch (notification.type) {
      case "like":
        return "liked your post.";

      case "comment":
        return "commented on your post.";

      case "follow":
        return "started following you.";

      default:
        return "interacted with your profile.";
    }
  };

  const formattedDate = new Date(notification.createdAt).toLocaleString(
    "en-GB",
    {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    },
  );

  return (
    <article
      className={`${styles.item} ${!notification.isRead ? styles.unread : ""}`}
      onClick={() => onNotificationClick(notification)}
    >
      <div className={styles.avatar}>
        {sender?.profilePic ? (
          <img src={sender.profilePic} alt={sender.username} />
        ) : (
          avatar
        )}
      </div>

      <div className={styles.content}>
        <p className={styles.text}>
          <strong>{sender?.username}</strong> {getNotificationText()}
        </p>

        <span className={styles.date}>{formattedDate}</span>
      </div>

      {notification.post?.image && (
        <div className={styles.postPreview}>
          <img
            src={notification.post.image}
            alt={notification.post.caption || "Post"}
          />
        </div>
      )}

      {!notification.isRead && <span className={styles.unreadDot} />}
    </article>
  );
}

export default NotificationItem;
