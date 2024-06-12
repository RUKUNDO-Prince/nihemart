import { create } from "zustand";
import axios from "axios";

// Helper function to get liked products from localStorage
const getLikedProductsFromLocalStorage = () => {
  const likedProducts = localStorage.getItem("likedProducts");
  return likedProducts ? JSON.parse(likedProducts) : [];
};

const useLikedProductsStore = create((set, get) => ({
  likedProducts: getLikedProductsFromLocalStorage(),

  // Like a product
  likeProduct: async (productId) => {
    try {
      const { likedProducts } = get();
      if (!likedProducts.includes(productId)) {
        const newLikedProducts = [...likedProducts, productId];

        // Optionally sync with backend
        await axios.post("/api/like", { productId });

        // Update store and localStorage
        set({ likedProducts: newLikedProducts });
        localStorage.setItem("likedProducts", JSON.stringify(newLikedProducts));
      }
    } catch (error) {
      console.error("Error liking product:", error);
      // Handle error as needed
    }
  },

  // Unlike a product
  unlikeProduct: async (productId) => {
    try {
      const { likedProducts } = get();
      if (likedProducts.includes(productId)) {
        const newLikedProducts = likedProducts.filter((id) => id !== productId);

        // Optionally sync with backend
        await axios.post("/api/unlike", { productId });

        // Update store and localStorage
        set({ likedProducts: newLikedProducts });
        localStorage.setItem("likedProducts", JSON.stringify(newLikedProducts));
      }
    } catch (error) {
      console.error("Error unliking product:", error);
      // Handle error as needed
    }
  },

  // Check if a product is liked
  isProductLiked: (productId) => {
    const { likedProducts } = get();
    return likedProducts.includes(productId);
  },

  // Load liked products from localStorage (optional)
  loadLikedProducts: () => {
    const likedProducts = getLikedProductsFromLocalStorage();
    set({ likedProducts });
  },
}));

export default useLikedProductsStore;
