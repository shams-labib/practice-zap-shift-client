import React from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import amazon from "../../../assets/brands/amazon.png";
import amazonVector from "../../../assets/brands/amazon_vector.png";
import casio from "../../../assets/brands/casio.png";
import monstar from "../../../assets/brands/moonstar.png";
import restad from "../../../assets/brands/randstad.png";
import star from "../../../assets/brands/star.png";
import starPeople from "../../../assets/brands/start_people.png";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

const Brands = () => {
  const brandsLogo = [
    amazon,
    amazonVector,
    casio,
    monstar,
    restad,
    star,
    starPeople,
  ];

  return (
    <Swiper
      slidesPerView={4}
      centeredSlides={true}
      spaceBetween={30}
      grabCursor={true}
      loop={true}
      autoplay={{
        delay: 1000,
        disableOnInteraction: false,
      }}
      modules={[Autoplay, Pagination, Navigation]}
    >
      {brandsLogo.map((logo, index) => (
        <SwiperSlide key={index}>
          <img src={logo} alt="" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Brands;
