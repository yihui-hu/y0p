import styles from "@/styles/loading.module.css";

const Loading = () => {
  return (
    <div className={styles.loadingContainer}>
      <span className={styles.loadingText}>Loading...</span>
    </div>
  );
};

export default Loading;
