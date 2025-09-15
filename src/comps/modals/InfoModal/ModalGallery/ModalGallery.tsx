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
//@ts-ignore
export const ModalGallery = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className={styles.gallery}>
      {/* Top large image */}
      <ModalImage src={images[activeIndex]} height="568px" />

      {/* Thumbnail slider */}
      <div className={styles.thumbsWrapper}>
        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={10}
          slidesPerView={6}
          onSlideChange={() => {}}
          className={styles.swiper}
        >
          {
          //@ts-ignore
          images.map((src, i) => (
            <SwiperSlide key={i}>
              <img
                src={src}
                alt=""
                className={`${styles.thumb} ${
                  i === activeIndex ? styles.active : ""
                }`}
                onClick={() => setActiveIndex(i)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
