import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../Context/ContextProvider";

const axiosSequre = axios.create({
  baseURL: "http://localhost:5001",
  headers: {
    "Content-Type": "application/json",
  },
});

const useAxiosSequre = () => {
  const nvaigate = useNavigate();
  const { user, logoutUser } = useContext(AppContext);

  axiosSequre.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("access-token");
      if (token) {
        config.headers.authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  axiosSequre.interceptors.response.use(
    (response) => {
      const token = localStorage.getItem("access-token");
      if (token) {
        response.headers.authorization = `Bearer ${token}`;
      }
      return response;
    },
    async (error) => {
      const statusCode = error.response?.status;
      if (statusCode === 401 || statusCode === 403) {
        await logoutUser();
        nvaigate("/login");
      }
      return Promise.reject(error);
    }
  );
  return axiosSequre;
};

export default useAxiosSequre;
