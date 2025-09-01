import React from "react";
import styles from "./Footer.module.css";
import Contact from "./Contact";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.brand}>
          <h2 className={styles.logo}>AI LOVE ANIME</h2>
          <p>
            Your Anime, your choice. We’d love to hear your feedback to make
            your experience even better!
          </p>
        </div>

        <Contact />
      </div>

      <p className={styles.copyright}>
        &copy; {new Date().getFullYear()} AI LOVE ANIME. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
