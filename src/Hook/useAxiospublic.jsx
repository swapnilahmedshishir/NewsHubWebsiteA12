import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "http://localhost:5001",
  headers: {
    "Content-type": "application/json",
  },
});
export const useAxiospublic = () => {
  return axiosPublic;
};
