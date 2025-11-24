import React, { use } from "react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ReviewCard from "./ReviewCard";

const Reviews = ({ reviewPromise }) => {
  const reviewsData = use(reviewPromise);
  console.log(reviewsData);

  return (
    <div className="my-24">
      <div className="text-center mb-24">
        <h3 className="text-center mt-10 text-3xl font-semibold">Review </h3>
        <p className="font-bold">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi
          voluptatem unde sapiente aspernatur. Facilis, magni at ad nesciunt ex
          illo architecto enim aperiam, voluptate itaque adipisci corporis
          possimus, aliquid eos?
        </p>
      </div>
      <>
        <Swiper
          loop={true}
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={3}
          coverflowEffect={{
            rotate: 30,
            stretch: "50%",
            depth: 200,
            scale: 0.75,
            modifier: 1,
            slideShadows: true,
          }}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          pagination={true}
          modules={[EffectCoverflow, Pagination, Autoplay]}
          className="mySwiper"
        >
          {reviewsData.map((review) => (
            <SwiperSlide className="mt-10" key={review.id}>
              <ReviewCard review={review}></ReviewCard>
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    </div>
  );
};

export default Reviews;
