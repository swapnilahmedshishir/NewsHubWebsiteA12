import { useQuery } from "@tanstack/react-query";
import useAxiosSequre from "./useAxiosSequre";

const useGetPublisherData = () => {
  const axiosSeque = useAxiosSequre();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["publishers"],
    queryFn: async () => {
      const response = await axiosSeque.get("/api/publishers");
      return response.data;
    },
  });
  return [data, isLoading, refetch];
};

export default useGetPublisherData;
