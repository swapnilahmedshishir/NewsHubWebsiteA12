import { useQuery } from "@tanstack/react-query";
import useAxiosSequre from "./useAxiosSequre";
import { useState, useEffect } from "react";

const useArtical = ({ searchTerm, selectedPublisher, selectedTags }) => {
  const axiosSequre = useAxiosSequre();
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    if (!isQueryLoading && !queryError) {
      let filtered = allArticles;

      if (searchTerm) {
        filtered = filtered.filter((article) =>
          article.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      if (selectedPublisher) {
        filtered = filtered.filter(
          (article) => article.publisher === selectedPublisher
        );
      }

      if (selectedTags.length > 0) {
        filtered = filtered.filter((article) =>
          selectedTags.some((tag) => article.tags.includes(tag))
        );
      }

      setFilteredArticles(filtered);
      setIsLoading(false);
    }
  }, [
    searchTerm,
    selectedPublisher,
    selectedTags,
    allArticles,
    isQueryLoading,
    queryError,
  ]);

  useEffect(() => {
    if (queryError) {
      setError(queryError);
    }
  }, [queryError]);

  return [filteredArticles, isLoading, error, refetch];
};

export default useArtical;
