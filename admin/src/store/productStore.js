import { create } from "zustand";
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
    
    console.log(productSize);
    set({ isLoading: true });
    try {
      const formdata = new FormData();

      formdata.append("name", productName);
      formdata.append("description", productDesc);
      formdata.append("price", productPrice);
      formdata.append("quantity", ProductInStock);
      formdata.append("category", ProductCategory);
      formdata.append("size", JSON.stringify(productSize));
      formdata.append("gender", gender);
      formdata.append("discountType", discountType);
      formdata.append("discount", discount);

      if (files && files.length > 0) {
        files.forEach((file) => {
          formdata.append("files", file);
        });
      }

      const response = await authorizedApi.post(
        "/product/addProduct",
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const { message } = response.data;
      toast.success(message);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useProductStore;
