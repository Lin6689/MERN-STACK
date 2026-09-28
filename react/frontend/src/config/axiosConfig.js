import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",   // Change if your backend runs on different port
  headers: {
    Accept: "application/json",
  },
});

export default axiosInstance;