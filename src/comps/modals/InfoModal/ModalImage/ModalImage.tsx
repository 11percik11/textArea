import clsx from "clsx";
import styles from "./ModalImage.module.css";

interface ModalImageProps {
  height?: string;
  src?: string;
  className?: string;
  color?: string;
}

export const ModalImage = ({
  height = "463px",
  src = "",
  className = "",
  color = "",
}: ModalImageProps) => {
  const isVideo = /\.(mp4|mov|avi|webm|gif)$/i.test(src); // Проверяем расширение

  return (
    <div className={clsx([styles.wrapper, className])} style={{ height }}>
      {/* Background layer with overlay */}
      <div
        className={styles.background}
        style={{ backgroundColor: "#d3d3d3" }}
      ></div>

      {/* Foreground content (изображение или видео) */}
      {isVideo ? (
        <video
          className={styles.foreground}
          src={src}
          autoPlay
          loop
          playsInline
          controls
          disablePictureInPicture
          controlsList="nodownload noremoteplayback"
          onContextMenu={(e) => e.preventDefault()}
        />
      ) : (
        <img className={styles.foreground} src={src} alt="" />
      )}
    </div>
  );
};
