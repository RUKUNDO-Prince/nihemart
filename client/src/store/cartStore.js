import {create} from 'zustand';
import axios from 'axios';

const useCartStore = create((set) => ({
  cartItems: [],
  isLoading: false,
  error: null,

  // Fetch cart items for the user
  fetchCartItems: async (userId) => { // You might need a user ID to fetch the user's cart
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`/api/cart/${userId}`); // Replace with your actual API endpoint
      set({ cartItems: response.data, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  // Add item to the cart
  addToCart: async (product) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post('/api/cart', { productId: product.id }); // Replace with your actual API endpoint
      set((state) => ({
        cartItems: [...state.cartItems, response.data], // Assuming response returns the added item
        isLoading: false
      }));
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  // Remove item from the cart
  removeFromCart: async (productId) => {
    set({ isLoading: true, error: null });
    try {
      await axios.delete(`/api/cart/${productId}`); // Replace with your actual API endpoint
      set((state) => ({
        cartItems: state.cartItems.filter((item) => item.id !== productId),
        isLoading: false
      }));
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  // Clear all items from the cart (useful when an order is placed)
  clearCart: async () => {
    set({ isLoading: true, error: null });
    try {
      await axios.delete('/api/cart'); // Assuming this endpoint clears the entire cart
      set({ cartItems: [], isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },
}));

export default useCartStore;
