import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import bannerIMG1 from "../../../assets/banner/banner1.png";
import bannerIMG2 from "../../../assets/banner/banner2.png";
import bannerIMG3 from "../../../assets/banner/banner3.png";

const Banner = () => {
  return (
    <Carousel autoPlay={true} infiniteLoop={true}>
      {/* Slide 1 */}
      <div className="relative">
        <img src={bannerIMG1} />

        {/* CENTER BUTTONS */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-4">
          <button className="px-6 py-3 bg-white/80 rounded font-semibold">
            Btn 1
          </button>
          <button className="px-6 py-3 bg-white/80 rounded font-semibold">
            Btn 2
          </button>
        </div>
      </div>

      {/* Slide 2 */}
      <div className="relative">
        <img src={bannerIMG2} />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-4">
          <button className="px-6 py-3 bg-white/80 rounded font-semibold">
            Btn 1
          </button>
          <button className="px-6 py-3 bg-white/80 rounded font-semibold">
            Btn 2
          </button>
        </div>
      </div>

      {/* Slide 3 */}
      <div className="relative">
        <img src={bannerIMG3} />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-4">
          <button className="px-6 py-3 bg-white/80 rounded font-semibold">
            Btn 1
          </button>
          <button className="px-6 py-3 bg-white/80 rounded font-semibold">
            Btn 2
          </button>
        </div>
      </div>
    </Carousel>
  );
};

export default Banner;
