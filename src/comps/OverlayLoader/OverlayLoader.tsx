import React from "react";
import styles from "./OverlayLoader.module.css";
import clsx from "clsx";

interface OverlayLoaderProps {
  isLoading: boolean;
  fullscreen?: boolean;
  spinnerSizePx?: number;
  overlayColor?: string;
}

const OverlayLoader: React.FC<OverlayLoaderProps> = ({
  isLoading,
  fullscreen = true,
  spinnerSizePx,
  overlayColor = "rgba(0, 0, 0, 0.3)",
}) => {
  if (!isLoading) return null;

  const spinnerStyle = spinnerSizePx
    ? {
        width: spinnerSizePx,
        height: spinnerSizePx,
        border: `${spinnerSizePx / 6}px dotted #004662`,
      }
    : {};

  return (
    <div
      className={clsx([styles.overlay, fullscreen && styles.fullscreen])}
      style={{ backgroundColor: overlayColor }}
    >
      <div className={styles.spinner} style={spinnerStyle}></div>
    </div>
  );
};

export default OverlayLoader;
