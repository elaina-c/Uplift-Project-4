import styles from "./Intro.module.css";
import mediaStyles from "./IntroMedia.module.css";

const Intro = () => {
  return (
    <main>
      <div className={`${styles.websiteIntro} ${mediaStyles.websiteIntro}`}>
        <div
          className={`${styles.imgIntroContainer} ${mediaStyles.imgIntroContainer}`}
        >
          <div
            className={`${styles.leftImg} ${mediaStyles.leftImg}`}
            style={{ backgroundImage: "url('/AiLeft.png')" }}
          ></div>
        </div>

        <div className={`${styles.aboutWebsite} ${mediaStyles.aboutWebsite}`}>
          <div className={`${styles.logo} ${mediaStyles.logo}`}>
            <img
              src="/XiaoLogo.jpg"
              alt="logo"
              className={`${styles.XiaoLogo} ${mediaStyles.XiaoLogo}`}
            />
          </div>
          <div className={`${styles.introText} ${mediaStyles.introText}`}>
            <h2>
              Welcome to <br />
              <b>AI LOVE ANIME</b>
            </h2>
            <p>
              Find your next
              <span className={`${styles.highlight} ${mediaStyles.highlight}`}>
                Favorite anime
              </span>{" "}
              among the latest and greatest in the anime world! Go to top
              <span
                className={`${styles.highlight2} ${mediaStyles.highlight2}`}
              >
                Search
              </span>
              , explore what's trending, and uncover hidden
              <span
                className={`${styles.highlight3} ${mediaStyles.highlight3}`}
              >
                stars
              </span>
              .
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Intro;
