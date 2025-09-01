import styles from "./AnimeEpisodes.module.css";

const AnimeEpisodes = ({ episodes }) => {
  if (!episodes || episodes.length === 0)
    return <p className={styles.noEpisodes}>No episodes available.</p>;

  return (
    <div className={styles.episodesGrid}>
      {episodes.map((ep) => (
        <div key={ep.mal_id} className={styles.episodeCard}>
          <h4>
            Episode {ep.mal_id}: {ep.title}
          </h4>
          <p>
            Aired: {ep.aired ? new Date(ep.aired).toLocaleDateString() : "N/A"}
          </p>
          <a
            href={ep.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.watchBtn}
          >
            Watch
          </a>
        </div>
      ))}
    </div>
  );
};

export default AnimeEpisodes;
