import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <nav className={styles.nav}>
        <Link to="/">Home</Link>
        <Link to="/search">Search</Link>
        <Link to="/interest">Explore</Link>
        <Link to="/messages">Messages</Link>
        <Link to="/notifications">Notifications</Link>
        <Link to="/posts/create">Create</Link>
      </nav>

      <div className={styles.copyright}>© {currentYear} ICHgram</div>
    </footer>
  );
}

export default Footer;
