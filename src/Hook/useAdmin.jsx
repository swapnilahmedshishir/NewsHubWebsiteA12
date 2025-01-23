import { useContext } from "react";
import { AppContext } from "../Context/ContextProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSequre from "./useAxiosSequre";

const useAdmin = () => {
  const { user, isLoading } = useContext(AppContext);
  const axiosSecure = useAxiosSequre();
  console.log(isLoading);

  // Use React Query to fetch admin status
  const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
    queryKey: [user?.email, "admin"],
    queryFn: async () => {
      if (!user?.email) return false;
      // API call to check if the user is admin
      const response = await axiosSecure.get(`/api/adminuser/${user?.email}`);

      return response.data.isAdmin;
    },
    enabled: !isLoading,
  });

  return [isAdmin, isAdminLoading];
};

export default useAdmin;
