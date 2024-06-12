import { create } from "zustand";
import axios from "axios";

const useProductStore = create((set) => ({
  products: [],
  isLoading: false,
  error: null,

  // Fetch all products
  fetchProducts: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get("/api/products"); // Replace with your actual API endpoint
      set({ products: response.data, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  // Additional product store functionalities can go here
}));

export default useProductStore;
