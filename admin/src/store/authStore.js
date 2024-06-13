import { create } from "zustand";
import axios from "axios";
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
      const { message, account } = response.data; // Assuming the response contains a token and user data
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
      set({ error: error.message });
      toast.error(error.message);
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

      const { message, account } = response.data; // Assuming the response contains a token and user data
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

  // Fetch user data (optionally implement this to refresh user data)
  fetchUser: async () => {
    const token = getTokenFromLocalStorage();
    if (token) {
      try {
        const response = await axios.get("/api/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const user = response.data;
        set({ isAuthenticated: true, user, token });
      } catch (error) {
        console.error("Error fetching user data:", error);
        set({ isAuthenticated: false, user: null, token: null });
        localStorage.removeItem("adminToken");
      }
    }
  },
}));

export default useAuthStore;
