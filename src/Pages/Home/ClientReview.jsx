import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const clientReviews = [
  {
    id: 1,
    name: "Justin Shaifer",
    image:
      "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", // Replace with actual image URL
    review:
      "This platform has transformed the way I access content. Highly recommended!",
  },
  {
    id: 2,
    name: "Jane Smith",
    image:
      "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    review:
      "A seamless and user-friendly experience! I love the ad-free reading.",
  },
  {
    id: 3,
    name: "Michael Johnson",
    image:
      "https://images.pexels.com/photos/874158/pexels-photo-874158.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    review:
      "The best curated content from trusted publishers. This is my go-to platform!",
  },
  {
    id: 4,
    name: "Emily Davis",
    image:
      "https://images.pexels.com/photos/1680172/pexels-photo-1680172.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    review:
      "Amazing customer support and top-notch quality. Worth every penny!",
  },
  {
    id: 5,
    name: "Hannah Nelson",
    image:
      "https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    review:
      "A great investment for anyone looking for premium content. Super satisfied!",
  },
  {
    id: 6,
    name: "Sophia Martinez",
    image:
      "https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    review:
      "Simple, effective, and exactly what I was looking for. Highly recommend!",
  },
];

const ClientReview = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-100 to-blue-200">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">
          What Our Clients Say
        </h2>
        <p className="mt-4 text-lg text-gray-700 max-w-3xl mx-auto">
          Hear from our satisfied users about their experience.
        </p>

        <div className="mt-10 max-w-4xl mx-auto">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={25}
            slidesPerView={1}
            // autoplay={{ delay: 3000 }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop={true}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 2 },
            }}
            className="px-5"
          >
            {clientReviews.map((client) => (
              <SwiperSlide key={client.id}>
                <div className="bg-white shadow-lg rounded-lg p-6 text-center transition-transform transform hover:scale-105 duration-300">
                  <p className="mt-2 text-gray-600 text-lg italic">
                    "{client.review}"
                  </p>
                  <div className="flex align-middle justify-center gap-4 mt-7">
                    <div className="relative w-16 h-16 p-[2px] rounded-full bg-gradient-to-r from-blue-500 to-green-500">
                      <img
                        src={client.image}
                        alt={client.name}
                        className="w-full h-full rounded-full bg-white p-[3px]"
                      />
                    </div>

                    <h3 className="text-xl font-bold text-gray-800 flex items-center">
                      {client.name}
                    </h3>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default ClientReview;
