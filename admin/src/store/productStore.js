import { create } from "zustand";
import publicApi, { authorizedApi } from "../config/axiosInstance";
import { toast } from "react-toastify";

const useProductStore = create((set) => ({
  isLoading: false,
  products: [] || null,

  // adding products
  addProduct: async ({
    productName,
    productDesc,
    attributes,
    variations,
    productPrice,
    ProductInStock,
    ProductCategory,
    ProductSubCategory,
    discountType,
    discount,
    files,
  }) => {
    set({ isLoading: true });
    try {
      const formdata = new FormData();

      formdata.append("name", productName);
      formdata.append("description", productDesc);
      formdata.append("price", productPrice);
      formdata.append("quantity", ProductInStock);
      formdata.append("category", ProductCategory);
      formdata.append("subCategory", ProductSubCategory);
      formdata.append("attributes", JSON.stringify(attributes));
      formdata.append("variations", JSON.stringify(variations));
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
  // Fetch all products
  fetchProducts: async () => {
    set({ isLoading: true });
    try {
      const response = await publicApi.get("/product/allProducts");
      const { products } = response.data;
      set({ products: products, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },
}));

export default useProductStore;
