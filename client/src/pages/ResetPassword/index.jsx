import { Link } from "react-router-dom";
import styles from "./ResetPassword.module.css";
import ichgra from "@/assets/icons/ICHGRA.svg";
import reset from "@/assets/icons/reset.svg";
function ResetPassword() {
  return (
    <div className={styles.pageWrapper}>
      <header className={styles.pageHeader}>
        <div className={styles.headerContent}>
          <img src={ichgra} alt="logo" width={190} height={106} />
        </div>
      </header>

      <main className={styles.mainContent}>
        <div className={styles.formContainer}>
          <div className={styles.iconCircle}>
            <img src={reset} width={96} height={96} />
          </div>

          <h2 className={styles.title}>Trouble logging in?</h2>
          <p className={styles.description}>
            Enter your email, phone, or username and we'll send you a link to
            get back into your account.
          </p>

          <form className={styles.form}>
            <input
              type="text"
              placeholder="Email or Username"
              className={styles.inputField}
            />
            <button type="submit" className={styles.resetButton}>
              Reset your password
            </button>
          </form>

          <div className={styles.separator}>
            <div className={styles.line}></div>
            <div className={styles.orText}>OR</div>
            <div className={styles.line}></div>
          </div>

          <Link to="/register" className={styles.createAccountLink}>
            Create new account
          </Link>

          <div className={styles.formFooter}>
            <Link to="/login" className={styles.backButton}>
              Back to login
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ResetPassword;
