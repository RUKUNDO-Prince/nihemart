import { create } from "zustand";
import { authorizedApi } from "../config/axiosInstance";
import { toast } from "react-toastify";

const useOrderStore = create((set) => ({
  isLoading: false,
  orders: [] || null,

  getOrders: async () => {
    set({ isLoading: true });
    try {
      const response = await authorizedApi.get("/orders/all");
      set({ orders: response.data });
    } catch (error) {
      set({ isLoading: false });
      toast.error(error.response.data.error);
    } finally {
      set({ isLoading: false });
    }
  },

  getOrderById: async (orderId) => {
    set({ isLoading: true });
    try {
      const response = await authorizedApi.get(`/orders/order/${orderId}`);
      return response.data;
    } catch (error) {
      set({ isLoading: false });
      toast.error(error.response.data.error);
    } finally {
      set({ isLoading: false });
    }
  },

  // updated status
  updateOrderStatus: async (orderId, status) => {
    set({ isLoading: true });
    try {
      const response = await authorizedApi.patch(`/orders/${orderId}/status`, {
        status,
      });
      if (response.status === 201) toast.success(response.data);
    } catch (error) {
      set({ isLoading: false });
      toast.error(error.response.data.error);
    } finally {
      set({ isLoading: false });
    }
  },

  deleteOrder: async (orderId) => {
    set({ isLoading: true });
    try {
      const response = await authorizedApi.delete(`orders/order/${orderId}`);
      if (response.status === 201) {
        toast.success(response.data.message);
      }
    } catch (error) {
      set({ isLoading: false });
      toast.error(error.response.data.error);
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useOrderStore;
