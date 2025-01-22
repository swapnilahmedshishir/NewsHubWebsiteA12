import React, { useContext } from "react";
import { AppContext } from "../Context/ContextProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSequre from "./useAxiosSequre";

const useAdmin = () => {
  const { user } = useContext(AppContext);
  const axiosSequre = useAxiosSequre();
  const { data: isAdmin, isPending: isAdminLoading } = useQuery({
    queryKey: [user?.email, "admin"],
    queryFn: async () => {
      const response = await axiosSequre.get(`/api/adminuser/${user?.email}`);
      return response.data.isAdmin;
    },
  });
  return [isAdmin, isAdminLoading];
};

export default useAdmin;
