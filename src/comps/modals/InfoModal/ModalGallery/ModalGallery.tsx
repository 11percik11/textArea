import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "./SwiperClasses.css";
//@ts-ignore
import "swiper/css";
//@ts-ignore
import "swiper/css/navigation";

import styles from "./ModalGallery.module.css";
import { ModalImage } from "../ModalImage/ModalImage";
// @ts-ignore
export const ModalGallery = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  console.log(images);

  return (
    <div className={styles.gallery}>
      <ModalImage src={images[activeIndex]} height="568px" />

      <div className={styles.thumbsWrapper}>
        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={10}
          slidesPerView={6}
          onSlideChange={() => {}}
          className={styles.swiper}
        >
          {images.map((src: string, i: number) => {
            const isVideo = /\.(mp4|mov|avi|webm|gif)$/i.test(src); // Проверяем расширение файла

            return (
              <SwiperSlide key={i}>
                {isVideo ? (
                  <video
                    src={src}
                    className={`${styles.thumb} ${i === activeIndex ? styles.active : ""}`}
                    onClick={() => setActiveIndex(i)}
                    muted
                    playsInline
                  />
                ) : (
                  <img
                    src={src}
                    alt=""
                    className={`${styles.thumb} ${i === activeIndex ? styles.active : ""}`}
                    onClick={() => setActiveIndex(i)}
                  />
                )}
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};
