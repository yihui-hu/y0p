/*
 * This file contains the component for displaying a loading message when the 
 * image, text, or text style is being processed.
 *
 */

import styles from "@/styles/loading.module.css";

const Loading = () => {
  return (
    <div className={styles.loadingContainer}>
      <span className={styles.loadingText}>Loading...</span>
    </div>
  );
};

export default Loading;
