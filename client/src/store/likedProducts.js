import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";
import useAuthStore from "./authStore";
import { authorizedApi } from "../config/axiosInstance";



const useLikedProductsStore = create((set, get) => ({
  likedProducts: [],
  isLoading: false,
  error: null,

  // Initialize liked products from backend and localStorage
  initializeLikedProducts: async () => {
    set({ isLoading: true });
    try {
      const response = await authorizedApi.get("/product/likes/all");
      if (response.status === 201) {
        const likedProducts = response.data;
        set({ likedProducts });
      }
    } catch (error) {
      set({ error: error.response.data.error });
    } finally {
      set({ isLoading: false });
    }
  },

  // Like a product (Optimistic Update)
  likeProduct: async (productId) => {
    set({ isLoading: true });
    try {
      const response = await authorizedApi.post(`/product/${productId}/like`);
      if (response.status === 201) {
        toast.success(response?.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to like product");
    }finally{
      set({isLoading: false})
    }
  },

  // Unlike a product (Optimistic Update)
  unlikeProduct: async (productId) => {
    set({isLoading: true})
    try {
      const response = await authorizedApi.post(`/product/${productId}/unlike`);
      if (response.status === 201) {
        toast.success(response?.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to unlike product");
    }finally{
      set({isLoading: false})
    }
  },

  // remove all liked products
  removeLikedProducts: () => {
    set({ likedProducts: [] });
  },
}));

export default useLikedProductsStore;
