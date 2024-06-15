import { create } from "zustand";
import axios from "axios";
import { authorizedApi } from "../config/axiosInstance";
import { toast } from "react-toastify";

const useProductStore = create((set) => ({
  isLoading: false,
  products: [] || null,

  // adding products
  addProduct: async ({
    productName,
    productDesc,
    productSize,
    gender,
    productPrice,
    ProductInStock,
    ProductCategory,
    discountType,
    discount,
    files,
  }) => {
    set({ isLoading: true });
    try {
      const response = await authorizedApi.post("/product/addProduct", {
        name: productName,
        description: productDesc,
        price: productPrice,
        quantity: ProductInStock,
        category: ProductCategory,
        size: productSize,
        gender,
        discountType,
        discount,
        photos: files,
      });

      const { message } = response.data;
      toast.success(message);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useProductStore;
