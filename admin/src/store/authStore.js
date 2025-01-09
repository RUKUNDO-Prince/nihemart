import { create } from "zustand";
import publicApi from "../config/axiosInstance";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Helper function to get token from localStorage

const getUserFromLocalStorage = () => {
  return localStorage.getItem("user");
};

const getTokenfromLocalStorage = () => {
  return localStorage.getItem("adminToken");
};

const useAuthStore = create((set) => ({
  isLoading: false,
  isAuthenticated: !!getTokenfromLocalStorage(),
  user: getUserFromLocalStorage() || null,

  // Register new user

  register: async (name, email, password) => {
    set({ isLoading: true });
    try {
      const response = await publicApi.post("/admin/register", {
        name,
        email,
        password,
      });
      const { message, adminAccount,token } = response.data;
      set({
        isAuthenticated: true,
        isLoading: false,
        user: adminAccount,
      });
      localStorage.setItem("user", adminAccount);
      localStorage.setItem("adminToken", token);
      toast.success(message);
      return response.status
    } catch (error) {
      console.error("Error registering Admin:", error);
      // Handle error as needed
      set({ error: error });
      toast.error(error.response.data.message || error.response.data.error);
    } finally {
      set({ isLoading: false });
    }
  },

  // Login existing user

  login: async (email, password) => {
    try {
      const response = await publicApi.post("/admin/login", {
        email,
        password,
      });

      const { message, adminAccount,token } = response.data;
      set({ isAuthenticated: true, isLoading: false, user: adminAccount });
      localStorage.setItem("user", adminAccount);
      localStorage.setItem("adminToken", token);
      toast.success(message);
      return response.status
    } catch (error) {
      console.error("Error logging in:", error);
      // Handle error as needed
      toast.error(error.message);
    }
  },

  // Logout user
  logout: async () => {
    try {
      localStorage.removeItem("user");
      localStorage.removeItem("adminToken");
      set({ isAuthenticated: false, user: null, token: null });
      toast.success("You have logged out!");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
}));

export default useAuthStore;
