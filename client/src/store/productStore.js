import { create } from "zustand";
import publicApi from "../config/axiosInstance";

const useProductStore = create((set) => ({
  products: [],
  isLoading: false,
  error: null,

  // Fetch all products
  fetchProducts: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await publicApi.get("/product/allProducts"); // Replace with your actual API endpoint
      const { products } = response.data;
      set({ products: products, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  // Additional product store functionalities can go here
}));

export default useProductStore;
