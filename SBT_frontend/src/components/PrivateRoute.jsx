import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";

const PrivateRoute = ({ allowedRoles }) => {
  const { user } = useContext(StoreContext);

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
