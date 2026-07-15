import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { updateProfile } from "@/redux/users/userThunks";

import styles from "./EditProfile.module.css";

function EditProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, status, error } = useSelector((state) => state.auth);

  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(user?.profilePic || "");

  const { register, handleSubmit } = useForm({
    defaultValues: {
      fullName: user?.fullName || "",
      username: user?.username || "",
      bio: user?.bio || "",
      website: user?.website || "",
    },
  });

  const avatarLetter =
    user?.fullName?.charAt(0).toUpperCase() ||
    user?.username?.charAt(0).toUpperCase() ||
    "?";

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("fullName", data.fullName);
    formData.append("username", data.username);
    formData.append("bio", data.bio);
    formData.append("website", data.website);

    if (selectedFile) {
      formData.append("profilePic", selectedFile);
    }

    await dispatch(updateProfile(formData)).unwrap();

    navigate("/profile");
  };

  return (
    <div className={styles.page}>
      <h1>Edit profile</h1>

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.userCard}>
          <div className={styles.avatar}>
            {preview ? <img src={preview} alt="Profile" /> : avatarLetter}
          </div>

          <div className={styles.userInfo}>
            <p>{user?.username}</p>
            <span>{user?.bio || "Add your bio"}</span>
          </div>

          <label className={styles.changePhoto}>
            Change photo
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </label>
        </div>

        <label>
          Name
          <input {...register("fullName")} />
        </label>

        <label>
          Username
          <input {...register("username")} />
        </label>

        <label>
          Bio
          <textarea rows="4" {...register("bio")} />
        </label>

        <label>
          Website
          <input {...register("website")} />
        </label>

        {error && <p className={styles.error}>{error}</p>}

        <button type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
}

export default EditProfile;
