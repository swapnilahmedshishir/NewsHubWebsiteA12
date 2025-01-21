import axios from "axios";

const axiosSequre = axios.create({
  baseURL: "http://localhost:5001",
  headers: {
    "Content-Type": "application/json",
  },
});

const useAxiosSequre = () => {
  return axiosSequre;
};

export default useAxiosSequre;
