import { create } from "zustand";
import publicApi from "../config/axiosInstance";
import toast from "react-hot-toast";

// Helper function to get token from localStorage
const getTokenFromLocalStorage = () => {
  return localStorage.getItem("authToken");
};

// Helper function to get user from localStorage
const getUserFromLocalStorage = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const useAuthStore = create((set) => {
  const token = getTokenFromLocalStorage();
  const user = getUserFromLocalStorage();

  return {
    isLoading: false,
    isAuthenticated: !!token,
    user: user,
    token: token,
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
        const { message, token, user } = response.data;

        localStorage.setItem("authToken", token);
        localStorage.setItem("user", JSON.stringify(user));

        set({
          isAuthenticated: true,
          token,
          isLoading: false,
          user: user,
        });
        toast.success(message);
      } catch (error) {
        console.error("Error registering user:", error);
        set({
          error: error.response?.data?.message || error.message,
          isLoading: false,
        });
        toast.error(error.response?.data?.message || error.message);
      }
    },

    // Login existing user
    login: async (email, password) => {
      set({ isLoading: true, error: null });
      try {
        const response = await publicApi.post("/user/signin", {
          email,
          password,
        });
        const { message, token, responseUser } = response.data;
        localStorage.setItem("authToken", token);
        localStorage.setItem("user", JSON.stringify(responseUser));

        set({
          isAuthenticated: true,
          token,
          isLoading: false,
          user: responseUser,
        });
        toast.success(message);
      } catch (error) {
        console.error("Error logging in:", error);
        set({
          error: error.response?.data?.message || error.message,
          isLoading: false,
        });
        toast.error(error.response?.data?.message);
      }
    },

    // Logout user
    logout: () => {
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      toast.success("Logged out!");
      set({ isAuthenticated: false, user: null, token: null });
    },
  };
});

export default useAuthStore;
