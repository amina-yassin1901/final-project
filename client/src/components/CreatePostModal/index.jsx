import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { createPost } from "@/redux/posts/postsSlice";

import styles from "./CreatePostModal.module.css";

function CreatePostModal({ onClose }) {
  const dispatch = useDispatch();

  const { status, error } = useSelector((state) => state.posts);

  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const isLoading = status === "loading";

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    if (!image && !caption.trim()) return;

    const formData = new FormData();

    formData.append("caption", caption);

    if (image) {
      formData.append("image", image);
    }

    const result = await dispatch(createPost(formData));

    if (createPost.fulfilled.match(result)) {
      onClose();
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(event) => event.stopPropagation()}
      >
        <header className={styles.header}>
          <button className={styles.closeBtn} onClick={onClose}>
            ×
          </button>

          <h2>Create new post</h2>

          <button
            className={styles.shareBtn}
            onClick={handleSubmit}
            disabled={isLoading || (!image && !caption.trim())}
          >
            {isLoading ? "Sharing..." : "Share"}
          </button>
        </header>

        <div className={styles.content}>
          <label className={styles.uploadArea}>
            {preview ? (
              <img src={preview} alt="Preview" className={styles.preview} />
            ) : (
              <span className={styles.uploadIcon}>☁</span>
            )}

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className={styles.fileInput}
            />
          </label>

          <aside className={styles.side}>
            <textarea
              value={caption}
              onChange={(event) => setCaption(event.target.value)}
              placeholder="Write a caption..."
              maxLength={200}
              className={styles.textarea}
            />

            <span className={styles.counter}>{caption.length}/200</span>

            {error && <p className={styles.error}>{error}</p>}
          </aside>
        </div>
      </div>
    </div>
  );
}

export default CreatePostModal;
