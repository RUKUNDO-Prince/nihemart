import { create } from "zustand";
import axios from "axios";
import { authorizedApi } from "../config/axiosInstance";
import { toast } from "react-toastify";

const useCartStore = create((set) => ({
  cartItems: [],
  isLoading: false,
  error: null,

  fetchCartItems: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await authorizedApi.get("/cart/");
      set({ cartItems: response.data, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  // Add item to the cart
  addToCart: async (productId, quantity) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authorizedApi.post(`/cart/${productId}?quantity=${quantity}`);
      set((state) => ({
        cartItems: [...state.cartItems, response.data],
        isLoading: false,
      }));
      toast.success("Product added to cart!");
    } catch (error) {
      set({ error: error.message, isLoading: false });
      toast.error("Failed to add product to cart.");
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
      set({ cartItems: [], isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },
}));

export default useCartStore;
