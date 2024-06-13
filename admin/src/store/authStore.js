import { create } from "zustand";
import publicApi from "../config/axiosInstance";
import { toast } from "react-toastify";

// Helper function to get token from localStorage

const getUserFromLocalStorage = () => {
  return localStorage.getItem("user");
};

const useAuthStore = create((set) => ({
  isLoading: false,
  isAuthenticated: false,
  user: getUserFromLocalStorage() || null,

  // Register new user

  register: async (name, email, password) => {
    set({ isLoading: true });
    try {
      const response = await publicApi.post("/account", {
        name,
        email,
        password,
      });
      const { message, account } = response.data;
      set({
        isAuthenticated: true,
        isLoading: false,
        user: account,
      });
      localStorage.setItem("user", account);
      toast.success(message);

    } catch (error) {
      console.error("Error registering Admin:", error);
      // Handle error as needed
      set({ error: error });
      toast.error(error.response.data.message);
    } finally {
      set({ isLoading: false });
    }
  },

  // Login existing user

  login: async (email, password) => {
    try {
      const response = await publicApi.post("/auth/login", {
        email,
        password,
      });

      const { message, account } = response.data;
      set({ isAuthenticated: true, isLoading: false, user: account });
      localStorage.setItem("user",account);
      toast.success(message);
    } catch (error) {
      console.error("Error logging in:", error);
      // Handle error as needed
      toast.error(error.message);
    }
  },

  // Logout user
  logout: async () => {
    try {
      await publicApi.post("/auth/logout");

      set({ isAuthenticated: false, user: null, token: null });
      localStorage.removeItem("user");
    } catch (error) {}
  },
}));

export default useAuthStore;
