import { create } from "zustand";
import axios from "axios";

// Helper function to get token from localStorage
const getTokenFromLocalStorage = () => {
  return localStorage.getItem("authToken");
};

const useAuthStore = create((set) => ({
  isAuthenticated: !!getTokenFromLocalStorage(),
  user: null,
  token: getTokenFromLocalStorage(),

  // Register new user
  register: async (email, password, phoneNumber) => {
    try {
      const response = await axios.post("/api/register", {
        email,
        password,
        phoneNumber,
      });
      const { token, user } = response.data; // Assuming the response contains a token and user data
      localStorage.setItem("authToken", token); // Store token in localStorage
      set({ isAuthenticated: true, user, token });
    } catch (error) {
      console.error("Error registering user:", error);
      // Handle error as needed
    }
  },

  // Login existing user
  login: async (email, password) => {
    try {
      const response = await axios.post("/api/login", {
        email,
        password,
      });
      const { token, user } = response.data; // Assuming the response contains a token and user data
      localStorage.setItem("authToken", token); // Store token in localStorage
      set({ isAuthenticated: true, user, token });
    } catch (error) {
      console.error("Error logging in:", error);
      // Handle error as needed
    }
  },

  // Logout user
  logout: () => {
    localStorage.removeItem("authToken"); // Remove token from localStorage
    set({ isAuthenticated: false, user: null, token: null });
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
        localStorage.removeItem("authToken");
      }
    }
  },
}));

export default useAuthStore;
