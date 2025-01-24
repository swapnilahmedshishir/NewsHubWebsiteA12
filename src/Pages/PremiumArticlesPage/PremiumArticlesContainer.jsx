import React from "react";
import PremiumArticlesPage from "./PremiumArticlesPage";
import useAxiosSequre from "../../Hook/useAxiosSequre";
import { useQuery } from "@tanstack/react-query";

const PremiumArticlesContainer = () => {
  const axiosSequre = useAxiosSequre();

  const {
    data: allArticles = [],
    isLoading: isQueryLoading,
    error: queryError,
    refetch,
  } = useQuery({
    queryKey: ["articles"],
    queryFn: async () => {
      const response = await axiosSequre.get("/api/allarticles");
      return response.data;
    },
  });

  return <PremiumArticlesPage articles={allArticles} />;
};

export default PremiumArticlesContainer;
