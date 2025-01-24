import { useQuery } from "@tanstack/react-query";
import { useAxiospublic } from "./useAxiospublic";
// import useAxiosSequre from "./useAxiosSequre";

const useGetPublisherData = () => {
  const axiosPublic = useAxiospublic();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["publishers"],
    queryFn: async () => {
      const response = await axiosPublic.get("/api/publishers");
      return response.data;
    },
  });
  return [data, isLoading, refetch];
};

export default useGetPublisherData;
