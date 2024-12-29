import { create } from "zustand";
import { authorizedApi } from "../config/axiosInstance";
import { toast } from "react-toastify";

const useOrderStore = create((set) => ({
  isLoading: false,
  orders: [],
  order: null,

  getOrders: async () => {
    set({ isLoading: true });
    try {
      const response = await authorizedApi.get("/orders/all");
      set({ orders: response.data });
    } catch (error) {
      set({ isLoading: false });
      toast.error(error.response?.data?.error || "Failed to fetch orders.");
    } finally {
      set({ isLoading: false });
    }
  },

  getOrderById: async (orderId) => {
    set({ isLoading: true });
    try {
      const response = await authorizedApi.get(`/orders/order/${orderId}`);
      set({ order: response.data });
      return response.data; // Return the order data
    } catch (error) {
      set({ isLoading: false });
      toast.error(error.response?.data?.error || "Failed to fetch order.");
    } finally {
      set({ isLoading: false });
    }
  },

  // Other functions...
}));

export default useOrderStore; 