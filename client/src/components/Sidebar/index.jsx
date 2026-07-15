import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import home from "@/assets/icons/home.svg";
import create from "@/assets/icons/create.svg";
import exp from "@/assets/icons/exp.svg";
import noti from "@/assets/icons/noti.svg";
import search from "@/assets/icons/search.svg";
import sms from "@/assets/icons/sms.svg";
import { logout } from "@/redux/auth/authSlice";

import styles from "./Sidebar.module.css";

function Sidebar({ onOpenCreatePost }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const avatarLetter =
    user?.fullName?.charAt(0).toUpperCase() ||
    user?.username?.charAt(0).toUpperCase() ||
    "?";

  return (
    <aside className={styles.sidebar}>
      <div>
        <nav className={styles.nav}>
          <NavLink to="/" end className={styles.item}>
            <img src={home} width={24} height={24} alt="Home" />
            <span>Home</span>
          </NavLink>

          <NavLink to="/search" className={styles.item}>
            <img src={search} width={24} height={24} alt="Search" />
            <span>Search</span>
          </NavLink>

          <NavLink to="/interest" className={styles.item}>
            <img src={exp} width={24} height={24} alt="Explore" />
            <span>Explore</span>
          </NavLink>

          <NavLink to="/messages" className={styles.item}>
            <img src={sms} width={24} height={24} alt="Messages" />
            <span>Messages</span>
          </NavLink>

          <NavLink to="/notifications" className={styles.item}>
            <img src={noti} width={24} height={24} alt="Notifications" />
            <span>Notifications</span>
          </NavLink>

          <button
            type="button"
            className={styles.item}
            onClick={onOpenCreatePost}
          >
            <img src={create} width={24} height={24} alt="Create" />
            <span>Create</span>
          </button>
        </nav>
      </div>

      <div className={styles.bottom}>
        <NavLink to="/profile" className={styles.item}>
          <div className={styles.avatar}>
            {user?.profilePic ? (
              <img src={user.profilePic} alt="Profile" />
            ) : (
              avatarLetter
            )}
          </div>
          <span>Profile</span>
        </NavLink>

        <button className={styles.logout} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
