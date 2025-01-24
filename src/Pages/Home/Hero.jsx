import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import useAxiosSequre from "../../Hook/useAxiosSequre";
import { useQuery } from "@tanstack/react-query";

const Hero = () => {
  const axiosSequre = useAxiosSequre();

  // Fetch all articles
  const {
    data: allArticles = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["articles"],
    queryFn: async () => {
      const response = await axiosSequre.get("/api/allarticles");
      return response.data;
    },
  });

  // Log API response to debug
  console.log("All Articles:", allArticles);

  // Filter and sort articles for the slider
  const trendingArticles = allArticles
    ?.filter((article) => article.status === "Approved" && article.views)
    .sort((a, b) => b.views - a.views)
    .slice(0, 1); // Show max 6 articles

  console.log("Trending Articles:", trendingArticles);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading articles: {error.message}</p>;

  return (
    <section>
      {trendingArticles?.length > 0 ? (
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          className="h-[500px]"
        >
          {trendingArticles.map((article) => (
            <SwiperSlide key={article._id}>
              <div
                className="flex justify-center items-center bg-cover bg-center h-full"
                style={{
                  backgroundImage: `url(${
                    article.image || "/placeholder.jpg"
                  })`,
                }}
              >
                <div className="text-white font-montserrat text-center h-full p-5 bg-black/60 rounded-lg w-3/4">
                  <h2 className="font-bold text-3xl mb-4">{article.title}</h2>
                  <p className="mb-4">{article.description}</p>
                  <button className="btn py-3 px-8 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-3xl font-extrabold">
                    Read More
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p>No trending articles available.</p>
      )}
    </section>
  );
};

export default Hero;
