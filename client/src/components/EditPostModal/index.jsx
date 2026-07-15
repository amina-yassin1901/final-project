import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { updatePost } from "@/redux/posts/postsSlice";

import styles from "./EditPostModal.module.css";

function EditPostModal({ post, onClose, onUpdated }) {
  const dispatch = useDispatch();

  const { status, error } = useSelector((state) => state.posts);

  const [caption, setCaption] = useState(post?.caption || "");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(post?.image || "");

  const isLoading = status === "loading";

  useEffect(() => {
    return () => {
      if (preview?.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (preview?.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append("caption", caption);

    if (image) {
      formData.append("image", image);
    }

    const result = await dispatch(
      updatePost({
        postId: post._id,
        formData,
      }),
    );

    if (updatePost.fulfilled.match(result)) {
      onUpdated(result.payload);
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
          <button
            type="button"
            className={styles.cancelButton}
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </button>

          <h2>Edit post</h2>

          <button
            type="submit"
            form="edit-post-form"
            className={styles.saveButton}
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Done"}
          </button>
        </header>

        <form
          id="edit-post-form"
          className={styles.content}
          onSubmit={handleSubmit}
        >
          <label className={styles.imageBox}>
            {preview ? (
              <img
                src={preview}
                alt="Post preview"
                className={styles.preview}
              />
            ) : (
              <span>Choose an image</span>
            )}

            <input
              type="file"
              accept="image/*"
              className={styles.fileInput}
              onChange={handleImageChange}
            />
          </label>

          <div className={styles.side}>
            <textarea
              value={caption}
              onChange={(event) => setCaption(event.target.value)}
              placeholder="Write a caption..."
              maxLength={500}
              className={styles.textarea}
            />

            <span className={styles.counter}>{caption.length}/500</span>

            {error && <p className={styles.error}>{error}</p>}
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditPostModal;
