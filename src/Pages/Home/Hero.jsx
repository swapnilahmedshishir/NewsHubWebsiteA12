import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

const Hero = () => {
  return (
    <section>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        className="h-screen"
      >
        {/* Slide 1 */}
        <SwiperSlide
          className={`flex justify-center items-center bg-[url('/assets/image/image_FundYourStartupIdea.jpg')]  bg-cover bg-center`}
        >
          <div className="text-white font-montserrat text-center h-full p-5 bg-black/60 rounded-lg">
            <div className="flex justify-center items-center pt-4 md:pt-24">
              <div>
                <h2 className="font-bold mb-5 text-3xl">
                  Fund Your Startup Idea
                </h2>
                <p className="mb-5 text-lg">
                  Turn your innovative idea into reality with the power of
                  community funding.
                </p>
                <button className="btn py-3 px-14 bg-gradient-to-r from-[#031741] via-[#03d2fc] to-[#022d33] text-white rounded-3xl font-extrabold">
                  Start Now
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide className="flex justify-center items-center bg-[url('/assets/image/image_GrowYourBusiness.jpg')] bg-cover bg-center">
          <div className="text-white font-montserrat text-center h-full p-5 bg-black/60 rounded-lg">
            <div className="flex justify-center items-center pt-4 md:pt-24">
              <div>
                <h2 className="font-bold mb-5 text-3xl">Grow Your Business</h2>
                <p className="mb-5 text-lg">
                  Secure the funding you need to take your business to the next
                  level.
                </p>
                <button className="btn py-3 px-14 bg-gradient-to-r from-[#031741] via-[#03d2fc] to-[#022d33] text-white rounded-3xl font-extrabold">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide className="flex justify-center items-center bg-[url('/assets/image/text_SupportCauses.jpg')] bg-cover bg-center">
          <div className="text-white font-montserrat text-center h-full p-5 bg-black/60 rounded-lg">
            <div className="flex justify-center items-center pt-4 md:pt-24">
              <div>
                <h2 className="font-bold mb-5 text-3xl">Support Causes</h2>
                <p className="mb-5 text-lg">
                  Join hands to support meaningful causes and make a difference
                  today.
                </p>
                <button className="btn py-3 px-14 bg-gradient-to-r from-[#031741] via-[#03d2fc] to-[#022d33] text-white rounded-3xl font-extrabold">
                  Donate Now
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default Hero;
