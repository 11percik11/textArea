import clsx from "clsx";
import styles from "./ModalImage.module.css";

export const ModalImage = ({ height = "463px", src = "", className = "" }) => {
  return (
    <div className={clsx([styles.wrapper, className])} style={{ height }}>
      {/* Background layer with overlay */}
      <div
        className={styles.background}
        style={{ backgroundImage: `url(${src})` }}
      ></div>

      {/* Foreground image */}
      <img className={styles.foreground} src={src} alt="" />
    </div>
  );
};
