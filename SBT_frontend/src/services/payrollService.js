import axios from "axios";

const API_URL = "http://localhost:5000/api/payrolls"; // Adjust if necessary

export const getPayrolls = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching payrolls:", error);
    return [];
  }
};

export const createPayroll = async (payrollData) => {
  try {
    const response = await axios.post(API_URL, payrollData);
    return response.data;
  } catch (error) {
    console.error("Error creating payroll:", error);
    throw error;
  }
};

export const updatePayrollStatus = async (id, status) => {
  try {
    const response = await axios.patch(`${API_URL}/${id}`, { status });
    return response.data;
  } catch (error) {
    console.error("Error updating payroll status:", error);
    throw error;
  }
};
