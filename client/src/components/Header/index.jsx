import styles from "./Header.module.css";
import logo from "@/assets/icons/logoi.svg";

function Header() {
  return (
    <header className={styles.header}>
      <img src={logo} alt="logo" />
    </header>
  );
}

export default Header;
