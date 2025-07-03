// utils/generateToken.js
import jwt from "jsonwebtoken";

const generateToken = (id) => {
  const token = jwt.sign({ _id: id }, process.env.JWT_SECRET, {
    expiresIn: "60m", // Token expires in 1 h
  });
  console.log("Generated token:", token);
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  console.log("Token expires at:", new Date(decoded.exp * 1000));
  return token;
};

export default generateToken;