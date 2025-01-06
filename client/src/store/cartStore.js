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
  removeFromCart: async (itemId) => {
    set({ isLoading: true, error: null });
    try {
      await authorizedApi.delete(`/cart/delete/${itemId}`); // Call the API to delete the item
      set((state) => ({
        cartItems: state.cartItems.filter((item) => item._id !== itemId), // Update the cart items in the state
        isLoading: false,
      }));
      toast.success("Item removed from cart!");
    } catch (error) {
      set({ error: error.message, isLoading: false });
      toast.error("Failed to remove item from cart.");
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
