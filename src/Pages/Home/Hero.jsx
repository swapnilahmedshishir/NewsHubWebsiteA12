import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import useAxiosSequre from "../../Hook/useAxiosSequre";
import { useQuery } from "@tanstack/react-query";
import useLoginUserInfo from "../../Hook/useLoginUserInfo";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const axiosSequre = useAxiosSequre();
  const navigate = useNavigate();

  const [userInfo] = useLoginUserInfo();

  // Check if the user has an active subscription
  const hasActiveSubscription = userInfo?.premiumTaken
    ? new Date(userInfo.premiumTaken) > new Date()
    : false;

  // Fetch all articles
  const {
    data: allArticles,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["articles"],
    queryFn: async () => {
      const response = await axiosSequre.get("/api/allarticles");
      return response.data;
    },
  });

  // Filter and sort articles for the slider.slice(0, 6);
  const trendingArticles = allArticles
    ?.filter((article) => article.status === "Approved" && article.views)
    .sort((a, b) => b.views - a.views)
    .slice(0, 6);

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
                  <div className="mt-3 md:mt-12">
                    <h2 className="font-bold text-3xl mb-4">{article.title}</h2>
                    <p className="mb-4">
                      {" "}
                      {article.description.slice(0, 400)}...
                    </p>

                    <button
                      onClick={() => navigate(`/articles/${article._id}`)}
                      disabled={article.isPremium && !hasActiveSubscription}
                      className={`btn py-3 px-8 rounded-3xl font-extrabold ${
                        article.isPremium && !hasActiveSubscription
                          ? "bg-gradient-to-r from-blue-400 to-green-500 text-white hover:from-blue-500 hover:to-green-600 cursor-not-allowed"
                          : "bg-gradient-to-r from-blue-400 to-green-500 text-white hover:from-blue-500 hover:to-green-600"
                      }`}
                    >
                      {article.isPremium && !hasActiveSubscription
                        ? "Subscribe to View"
                        : "Read More"}
                    </button>
                  </div>
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
