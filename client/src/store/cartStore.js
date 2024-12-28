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
  addToCart: (productId, quantity) => {
    const product = products.find((p) => p._id === productId);
    if (!product) {
      toast.error("Product not found.");
      return;
    }

    // Check if the product has variations
    if (product.hasVariations) {
      const selectedValuesArray = Object.values(selectedValues);
      if (selectedValuesArray.includes(null)) {
        toast.error("Please select at least one variation before adding to cart.");
        return;
      }
    }

    // Add product to cart logic
    set((state) => ({
      cart: [...state.cart, { productId, quantity }],
    }));
    toast.success("Product added to cart!");
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
