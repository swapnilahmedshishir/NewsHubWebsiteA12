import { useContext } from "react";
import { AppContext } from "../Context/ContextProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSequre from "./useAxiosSequre";

const useLoginUserInfo = () => {
  const { user, isLoading } = useContext(AppContext);
  const axiosSecure = useAxiosSequre();
  // Use React Query to fetch the admin status
  const { data, isLoading: isAdminLoading } = useQuery({
    queryKey: [user?.email, "loginUserInfo"],
    enabled: !isLoading,
    queryFn: async () => {
      if (!user?.email) return false;
      // API call to get user info
      const response = await axiosSecure.get(`/api/loginUser/${user?.email}`);
      console.log("User data:", response.data);
      return response.data.isAdmin;
    },
  });

  return [data, isAdminLoading];
};

export default useLoginUserInfo;
