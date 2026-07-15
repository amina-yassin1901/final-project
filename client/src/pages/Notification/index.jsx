import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import NotificationItem from "@/components/NotificationItem";
import PostModal from "@/components/PostModal";

import { getPostByIdRequest } from "@/api/posts";

import { markNotificationAsReadRequest } from "@/api/notifications";

import {
  getNotifications,
  markNotificationReadLocally,
} from "@/redux/notifications/notificationsSlice";

import styles from "./Notifications.module.css";

function Notifications() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { notifications, status, error } = useSelector(
    (state) => state.notifications,
  );

  const [selectedPost, setSelectedPost] = useState(null);
  const [openingId, setOpeningId] = useState(null);
  const [openError, setOpenError] = useState("");

  const isLoading = status === "loading";

  useEffect(() => {
    dispatch(getNotifications());
  }, [dispatch]);

  const handleNotificationClick = async (notification) => {
    if (openingId) {
      return;
    }

    try {
      setOpeningId(notification._id);
      setOpenError("");

      if (!notification.isRead) {
        await markNotificationAsReadRequest(notification._id);

        dispatch(markNotificationReadLocally(notification._id));
      }

      if (notification.type === "follow") {
        const senderId = notification.sender?._id || notification.sender;

        if (senderId) {
          navigate(`/users/${senderId}`);
        }

        return;
      }

      const postId = notification.post?._id || notification.post;

      if (!postId) {
        setOpenError("This notification does not have a post.");

        return;
      }

      const response = await getPostByIdRequest(postId);

      setSelectedPost(response.data);
    } catch (error) {
      console.error("Failed to open notification:", error);

      if (error.response?.status === 404) {
        setOpenError("This post is no longer available.");
      } else {
        setOpenError(
          error.response?.data?.message || "Failed to open notification.",
        );
      }
    } finally {
      setOpeningId(null);
    }
  };

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <h1>Notifications</h1>
      </header>

      {isLoading && notifications.length === 0 && (
        <p className={styles.message}>Loading notifications...</p>
      )}

      {error && notifications.length === 0 && (
        <p className={styles.error}>{error}</p>
      )}

      {openError && <p className={styles.error}>{openError}</p>}

      {!isLoading && !error && notifications.length === 0 && (
        <div className={styles.empty}>
          <div className={styles.icon}>♡</div>

          <h2>No notifications yet</h2>

          <p>Likes, comments and new followers will appear here.</p>
        </div>
      )}

      {notifications.length > 0 && (
        <section className={styles.list}>
          {notifications.map((notification) => (
            <div
              key={notification._id}
              className={openingId === notification._id ? styles.opening : ""}
            >
              <NotificationItem
                notification={notification}
                onNotificationClick={handleNotificationClick}
              />
            </div>
          ))}
        </section>
      )}

      {selectedPost && (
        <PostModal post={selectedPost} onClose={() => setSelectedPost(null)} />
      )}
    </main>
  );
}

export default Notifications;
