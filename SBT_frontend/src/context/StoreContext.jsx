import { createContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios, { setAuthHeader } from "../axiosHeaderRequestConfig.js";
import LargeLoading from "../components/loadings/LargeLoading.jsx";
import { toast } from "react-toastify";

export const StoreContext = createContext();

export const StoreContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [isFetchingTotalEmployee, setIsFetchingTotalEmployee] = useState(false);
  const [isFetchingStats, setIsFetchingStats] = useState(false);
  const [totalEmployee, setTotalEmployee] = useState(0);
  const [stats, setStats] = useState({
    totalActors: 0,
    totalStudents: 0,
    totalRegistered: 0,
  });
  const [user, setUser] = useState(null);

  const [financialData, setFinancialData] = useState({
    totalRevenue: 0,
    annualBudget: 0,
    otherFundTotal: 0,
    studentFees: 0,
    totalExpenses: 0,
    netProfit: 0,
  });
  const [chartOverview, setChartOverview] = useState(null);

  const fetchFinancialData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/financials/");
      console.log("Fetched financial data", res.data);
      setFinancialData(res.data);
    } catch (err) {
      console.error("Failed to fetch financial data:", err);
    }
  };

  useEffect(() => {
    fetchFinancialData();
  }, []);

useEffect(() => {
    const fetchChartOverview = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/financials");
        setChartOverview(res.data);
      } catch (err) {
        console.error("Error fetching overview:", err);
      }
    };
    fetchChartOverview();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchTotalEmployee = async () => {
      setIsFetchingTotalEmployee(true);
      try {
        const response = await axios.get(
          "http://localhost:5000/api/employee/"
        );
        setTotalEmployee(response.data.totalEmployee);
      } catch (error) {
        console.error("Error fetching total employees:", error);
      } finally {
        setIsFetchingTotalEmployee(false);
      }
    };
    fetchTotalEmployee();
  }, []);

  useEffect(() => {
    const fetchStats = async () => {
      setIsFetchingStats(true);
      try {
        const response = await axios.get("http://localhost:5000/api/stats");
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setIsFetchingStats(false);
      }
    };
    fetchStats();
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }

    const publicRoutes = ["/", "/login"];
    if (!token && !publicRoutes.includes(location.pathname)) {
      navigate("/login");
    }
  }, [location]);

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );

      if (response.data.requiresPasswordChange) {
        return {
          requiresPasswordChange: true,
          email: response.data.email,
          role: response.data.role,
        };
      }
      
      const { user, token } = response.data;

      if (!token) {
        return { success: false, message: "No token received" };
      }

      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      setAuthHeader();
      navigate("/");

      return { success: true, user, role: user.role };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      };
    }
  };

  const resetPassword = async (email, newPassword, confirmPassword, role) => {
    try {
      const response = await axios.put(
        "http://localhost:5000/api/auth/change-password",
        { email, newPassword, confirmPassword }
      );

      if (response.data.status) {
        toast.success("Password changed successfully!");
        return { success: true };
      } else {
        toast.error(response.data.message);
        return { success: false, message: response.data.message };
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Password change failed";
      toast.error(errorMessage);
      return { success: false, message: errorMessage };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (isLoading) return <LargeLoading />;

  return (
    <StoreContext.Provider
      value={{
        user,
        login,
        logout,
        stats,
        resetPassword,
        totalEmployee,
        isFetchingTotalEmployee,
        isFetchingStats,
        financialData,
        chartOverview,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
