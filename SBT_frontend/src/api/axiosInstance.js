import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/api", // Ensure this matches your backend endpoint
    withCredentials: true,
  });

export default api;
