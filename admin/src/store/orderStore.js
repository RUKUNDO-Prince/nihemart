import { create } from "zustand";
import { authorizedApi } from "../config/axiosInstance";
import { toast } from "react-hot-toast";

const useOrderStore = create((set) => ({
  isLoading: false,
  orders: [] || null,

  getOrders: async () => {
    set({ isLoading: true });
    try {
      const response = await authorizedApi.get("/orders/all");
      set({orders: response.data});
    } catch (error) {
      set({ isLoading: false });
      toast.error(error.response.data.error);
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useOrderStore;
