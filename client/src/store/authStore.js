import { create } from "zustand";

const useAuthStore = create((set) => ({
  isAuthenticated: false,
  user: null,
  login: (userData) => {
    // Here you would typically send a request to your backend with the user credentials
    // If the credentials are valid, set isAuthenticated to true and store user data
    // For the sake of simplicity, I'm assuming authentication is successful
    set({ isAuthenticated: true, user: userData });
  },
  logout: () => set({ isAuthenticated: false, user: null }),
}));

export default useAuthStore;
