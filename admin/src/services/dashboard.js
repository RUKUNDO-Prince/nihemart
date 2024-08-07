import { toast } from "react-toastify";
import { authorizedApi } from "../config/axiosInstance";

// getting admin dashboard stats

export const getAdminDashboardStats = async () => {
  try {
    const response = await authorizedApi.get("/admin/dashboard");
    return response.data;
  } catch (error) {
    toast.error(error.response.data.error);
  }
};
