import { create } from "zustand";
import { authorizedApi } from "../config/axiosInstance";
import { toast } from "react-toastify";

const useStatusUpdater = create((set) => ({
  isLoading: false,
  // updated status
  updateOrderStatus: async (orderId, status) => {
    set({ isLoading: true });
    try {
      const response = await authorizedApi.patch(`/orders/${orderId}/status`, {
        status,
      });
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

export default useStatusUpdater;
