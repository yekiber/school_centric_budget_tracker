import { jwtDecode } from "jwt-decode";

export const isTokenExpired = (token) => {
  if (!token) {
    console.log("No token provided");
    return true;
  }
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    console.log("Token exp:", decoded.exp, "Current time:", currentTime);
    return decoded.exp < currentTime;
  } catch (error) {
    console.error("Invalid token:", error);
    return true;
  }
};