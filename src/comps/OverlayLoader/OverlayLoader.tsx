import React from "react";
import styles from "./OverlayLoader.module.css";

interface OverlayLoaderProps {
  isLoading: boolean;
}

const OverlayLoader: React.FC<OverlayLoaderProps> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.spinner}></div>
    </div>
  );
};

export default OverlayLoader;
