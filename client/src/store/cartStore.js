import { create } from "zustand";
import axios from "axios";
import { authorizedApi } from "../config/axiosInstance";
import toast from "react-hot-toast";

const useCartStore = create((set) => ({
  cartItems: [],
  isLoading: false,
  error: null,

  fetchCartItems: async () => {
    // You might need a user ID to fetch the user's cart
    set({ isLoading: true, error: null });
    try {
      const response = await authorizedApi.get("/cart/cart");
      set({ cartItems: response.data, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  // Add item to the cart
  addToCart: async (productId,quantity) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authorizedApi.post(`/cart/cart/${productId}?quantity=${quantity}`); // Replace with your actual API endpoint
      if(response.data) toast.success("product added to cart");
      set((state) => ({
        cartItems: [...state.cartItems, response.data],
        isLoading: false,
      }));
      
    } catch (error) {
      set({ error: error.message, isLoading: false });
      toast.error(error.response.data.message)
    }
  },

  // Remove item from the cart
  removeFromCart: async (productId) => {
    set({ isLoading: true, error: null });
    try {
      await authorizedApi.delete(`/cart/delete/${productId}`); // Replace with your actual API endpoint
      set((state) => ({
        cartItems: state.cartItems.filter((item) => item.id !== productId),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  // Clear all items from the cart (useful when an order is placed)
  clearCart: async () => {
    set({ isLoading: true, error: null });
    try {
      await axios.delete("/api/cart"); // Assuming this endpoint clears the entire cart
      set({ cartItems: [], isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },
}));

export default useCartStore;
