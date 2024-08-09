import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";
import useAuthStore from "./authStore";
import { authorizedApi } from "../config/axiosInstance";

// Helper function to get liked products from localStorage
const getLikedProductsFromLocalStorage = () => {
  const likedProducts = localStorage.getItem("likedProducts");
  return likedProducts ? JSON.parse(likedProducts) : [];
};

// Helper function to save liked products to localStorage
const saveLikedProducts = (likedProducts) => {
  localStorage.setItem("likedProducts", JSON.stringify(likedProducts));
};

const useLikedProductsStore = create((set, get) => ({
  likedProducts: getLikedProductsFromLocalStorage(),
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
        saveLikedProducts(likedProducts);
      }
    } catch (error) {
      set({ error: error.response.data.error });
    } finally {
      set({ isLoading: false });
    }
  },

  // Like a product (Optimistic Update)
  likeProduct: async (productId) => {
    const { likedProducts } = get();
    // Optimistically update UI
    const updatedLikedProducts = [...likedProducts, productId];
    set({ likedProducts: updatedLikedProducts });
    saveLikedProducts(updatedLikedProducts);

    try {
      const response = await authorizedApi.post(`/product/${productId}/like`);
      if (response.status === 201) {
        toast.success(response?.data.message);
      }
    } catch (error) {
      // Rollback the optimistic update if the request fails
      const rolledBackLikedProducts = likedProducts.filter(
        (id) => id !== productId
      );
      set({ likedProducts: rolledBackLikedProducts });
      saveLikedProducts(rolledBackLikedProducts);
      toast.error(error?.response?.data?.message || "Failed to like product");
    }
  },

  // Unlike a product (Optimistic Update)
  unlikeProduct: async (productId) => {
    const { likedProducts } = get();
    // Optimistically update UI
    const updatedLikedProducts = likedProducts.filter((id) => id !== productId);
    set({ likedProducts: updatedLikedProducts });
    saveLikedProducts(updatedLikedProducts);

    try {
      const response = await authorizedApi.post(`/product/${productId}/unlike`);
      if (response.status === 201) {
        toast.success(response?.data.message);
      }
    } catch (error) {
      // Rollback the optimistic update if the request fails
      const rolledBackLikedProducts = [...likedProducts, productId];
      set({ likedProducts: rolledBackLikedProducts });
      saveLikedProducts(rolledBackLikedProducts);
      toast.error(error?.response?.data?.message || "Failed to unlike product");
    }
  },

  // remove all liked products
  removeLikedProducts: () => {
    set({ likedProducts: [] });
  },
}));

export default useLikedProductsStore;
