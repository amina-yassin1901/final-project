import bgfoto from "@/assets/images/Background.png";
import styles from "./NotFoundPage.module.css";
const NotFoundPage = () => {
  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <div className={styles.imageWrapper}>
          <img
            src={bgfoto}
            alt="ICHgram preview on phones"
            className={styles.image}
          />
        </div>

        <div className={styles.textWrapper}>
          <h1 className={styles.title}>Oops! Page Not Found (404 Error)</h1>

          <div className={styles.description}>
            <p>
              We're sorry, but the page you're looking for doesn't seem to
              exist.
            </p>
            <p>
              If you typed the URL manually, please double-check the spelling.
            </p>
            <p>If you clicked on a link, it may be outdated or broken.</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default NotFoundPage;
