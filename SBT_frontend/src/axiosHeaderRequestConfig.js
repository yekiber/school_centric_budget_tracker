import axios from "axios";
import { isTokenExpired } from "./tokenUtils";

const refreshToken = async () => {
  const refresh = localStorage.getItem("refreshToken");
  if (!refresh) throw new Error("No refresh token");
  const response = await axios.post("http://localhost:5000/api/auth/refresh", { refreshToken: refresh });
  localStorage.setItem("token", response.data.accessToken);
  return response.data.accessToken;
};

export const setAuthHeader = () => { // Export it
  const token = localStorage.getItem("token");
  console.log("Setting header with token:", token);
  if (token && !isTokenExpired(token)) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    console.log("Header set:", axios.defaults.headers.common["Authorization"]);
  } else {
    delete axios.defaults.headers.common["Authorization"];
    console.log("No valid token, header cleared");
  }
};

// Set header on initial load
setAuthHeader();

axios.interceptors.request.use(
  async (config) => {
    let token = localStorage.getItem("token");
    if (token && isTokenExpired(token)) {
      console.log("Token expired, refreshing...");
      token = await refreshToken();
      localStorage.setItem("token", token);
    }
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
      console.log("Request header:", config.headers["Authorization"]);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axios;