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
      if (!useAuthStore.getState().user) {
        toast.error("Please login first to add items to cart");
        return;
      }

      const response = await authorizedApi.post(`/cart/${productId}?quantity=${quantity}`);
      set((state) => ({
        cartItems: [...state.cartItems, response.data],
        isLoading: false,
      }));
      if (response.status === 200) {
        toast.success("Product added to cart successfully!");
        await useCartStore.getState().fetchCartItems();
      }
    } catch (error) {
      set({ error: error.message, isLoading: false });
      toast.error("Failed to add product to cart.");
    } finally {
      set({ isLoading: false }); 
    }
  },

  // Remove item from the cart
  removeFromCart: async (itemId) => {
    set({ isLoading: true, error: null });
    try {
      await authorizedApi.delete(`/cart/delete/${itemId}`); // Call the API to delete the item
      toast.success("Item removed from cart!");
      await useCartStore.getState().fetchCartItems();
      set((state) => ({
        cartItems: state.cartItems.filter((item) => item._id !== itemId), // Update the cart items in the state
        isLoading: false,
      }));
      toast.success("Item removed from cart!");
    } catch (error) {
      set({ error: error.message, isLoading: false });
      toast.error("Failed to remove item from cart.");
    } finally {
      set({ isLoading: false });
    }
  },

  // Clear all items from the cart (useful when an order is placed)
  clearCart: async () => {
    set({ isLoading: true, error: null });
    try {
      set({ cartItems: [], isLoading: false });
      toast.success("Cart cleared successfully");
    } catch (error) {
      set({ error: error.message, isLoading: false });
    } finally { 
      set({ isLoading: false });
    }
  },
}));

export default useCartStore;
