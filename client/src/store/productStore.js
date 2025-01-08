import { create } from "zustand";
import publicApi, { authorizedApi } from "../config/axiosInstance";
import useAuthStore from "./authStore";
import toast from "react-hot-toast";

const useProductStore = create((set) => ({
  products: [],
  product: null,
  isLoading: false,
  error: null,

  // Fetch all products
  fetchProducts: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await publicApi.get("/product/allProducts");
      const { products } = response.data;
      set({ products: products, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  getProductById: async (productId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await publicApi.get(
        `/product/singleProduct/${productId}`
      );
      const { product } = response.data;
      return product;
    } catch (error) {
      set({ error: error.message, isLoading: false });
    } finally {
      set({ isLoading: false });
    }
  },

  getSearchResults: async (searchQuery) => {
    set({ isLoading: true, error: null });
    try {
      const response = await publicApi.get(
        `/product/search?searchQuery=${searchQuery}`
      );

      const products = response.data;
      return products;
    } catch (error) {
      set({ error: error.message, isLoading: false });
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useProductStore;
