import { useQuery } from "@tanstack/react-query";
import useAxiosSequre from "./useAxiosSequre";

const useFetchArticles = (page, limit) => {
  const axiosSecure = useAxiosSequre();
  const {
    data: { result: articles = [], total = 0 } = {},
    isLoading,
    refetch,
    isError,
  } = useQuery({
    queryKey: ["articles", page, limit],
    queryFn: async () => {
      const response = await axiosSecure.get(
        `/api/articles?page=${page}&limit=${limit}`
      );

      return response.data;
    },
  });

  return [articles, total, isLoading, refetch, isError];
};

export default useFetchArticles;
