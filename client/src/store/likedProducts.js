import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

// Helper function to get liked products from localStorage
const getLikedProductsFromLocalStorage = () => {
  const likedProducts = localStorage.getItem("likedProducts");
  return likedProducts ? JSON.parse(likedProducts) : [];
};

const useLikedProductsStore = create((set, get) => ({
  likedProducts: getLikedProductsFromLocalStorage(),
  isLoading: false,
  error: null,
  // Like a product
  likeProduct: async (productId) => {
    set({ isLoading: true, error: null });

    const user = {
      name: "ineza",
      email: "test@gmail.com",
      phone: "0782307064",
    };
    if (!user) {
      toast.error("your're not logged in");
      set({ isLoading: false });
      return;
    }
    try {
      const response = await authorizedApi.post(
        `/product/${productId}/like`,
        user
      );
      if (response.status === 200) {
        toast.success(response?.message);
      }
    } catch (error) {
      set({ isLoading: false });
      toast.error(error?.response?.data?.message);
    } finally {
      set({ isLoading: false });
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
