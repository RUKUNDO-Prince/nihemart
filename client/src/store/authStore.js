import { create } from "zustand";
import publicApi from "../config/axiosInstance";
import { toast } from "react-toastify";

// Helper function to get token from localStorage
const getTokenFromLocalStorage = () => {
  return localStorage.getItem("authToken");
};

const useAuthStore = create((set) => ({
  isLoading: false,
  isAuthenticated: !!getTokenFromLocalStorage(),
  user: null,
  token: getTokenFromLocalStorage(),
  error: null,

  // Register new user
  register: async (name, email, password, phone) => {
    set({ isLoading: true, error: null });
    try {
      const response = await publicApi.post("/user/signup", {
        name,
        email,
        password,
        phone,
      });
      const { message, token } = response.data;
      localStorage.setItem("authToken", token);
      set({ isAuthenticated: true, token, isLoading: false });
      toast.success(message);
    } catch (error) {
      console.error("Error registering user:", error);
      set({ error: error.response?.data?.message || error.message, isLoading: false });
      toast.error(error.response?.data?.message || error.message);
    }
  },

  // Login existing user
  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await publicApi.post("/user/login", {
        email,
        password,
      });
      const { message, token } = response.data;
      localStorage.setItem("authToken", token);
      set({ isAuthenticated: true, token, isLoading: false });
      toast.success(message);
    } catch (error) {
      console.error("Error logging in:", error);
      set({ error: error.response?.data?.message || error.message, isLoading: false });
      toast.error(error.response?.data?.message || error.message);
    }
  },

  // Logout user
  logout: () => {
    localStorage.removeItem("authToken");
    toast.success("Logged out!");
    set({ isAuthenticated: false, user: null, token: null });
  },

  // Fetch user data (optionally implement this to refresh user data)
  fetchUser: async () => {
    const token = getTokenFromLocalStorage();
    if (token) {
      set({ isLoading: true, error: null });
      try {
        const response = await publicApi.get("/api/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const user = response.data;
        set({ isAuthenticated: true, user, token, isLoading: false });
      } catch (error) {
        console.error("Error fetching user data:", error);
        set({ isAuthenticated: false, user: null, token: null, isLoading: false });
        localStorage.removeItem("authToken");
        toast.error(error.response?.data?.message || error.message);
      }
    }
  },
}));

export default useAuthStore;
