import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { createPost, resetPostsStatus } from "@/redux/posts/postsSlice";

import styles from "./AddPost.module.css";

function AddPost() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, error } = useSelector((state) => state.posts);

  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const isLoading = status === "loading";

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!image && !caption.trim()) {
      return;
    }

    const formData = new FormData();

    formData.append("caption", caption);

    if (image) {
      formData.append("image", image);
    }

    const result = await dispatch(createPost(formData));

    if (createPost.fulfilled.match(result)) {
      setCaption("");
      setImage(null);
      setPreview("");
      navigate("/profile");
    }
  };

  useEffect(() => {
    dispatch(resetPostsStatus());
  }, [dispatch]);

  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Create new post</h1>

        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.uploadBox}>
            {preview ? (
              <img src={preview} alt="Preview" className={styles.preview} />
            ) : (
              <span>Click to upload image</span>
            )}

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className={styles.fileInput}
            />
          </label>

          <textarea
            value={caption}
            onChange={(event) => setCaption(event.target.value)}
            placeholder="Write a caption..."
            className={styles.textarea}
          />

          {error && <p className={styles.error}>{error}</p>}

          <button
            type="submit"
            disabled={isLoading || (!image && !caption.trim())}
            className={styles.button}
          >
            {isLoading ? "Publishing..." : "Publish"}
          </button>
        </form>
      </div>
    </main>
  );
}

export default AddPost;
