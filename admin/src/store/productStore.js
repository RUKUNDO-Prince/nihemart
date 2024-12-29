import { create } from "zustand";
import publicApi, { authorizedApi } from "../config/axiosInstance";
import { toast } from "react-toastify";

const useProductStore = create((set) => ({
  isLoading: false,
  products: [] || null,

  // adding products
  addProduct: async (formData) => {
    set({ isLoading: true });
    try {
      // Validate required fields
      const price = formData.get('price');
      if (!price || isNaN(parseFloat(price))) {
        throw new Error('Please provide a valid price');
      }

      // If there are variations, validate them
      if (formData.get('hasVariations') === 'true') {
        const variations = JSON.parse(formData.get('variations') || '[]');
        if (variations.some(v => !v.price || isNaN(parseFloat(v.price)))) {
          throw new Error('All variations must have valid prices');
        }
      }

      const response = await authorizedApi.post(
        "/product/addProduct",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const { message } = response.data;
      toast.success(message);
    } catch (error) {
      console.error("Product addition error:", error);
      toast.error(error.response?.data?.message || error.message);
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

  // fetch a single product
  getProductById: async (productId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await publicApi.get(
        `/product/singleProduct/${productId}`
      );
      const { product } = response.data;
      return product;
    } catch (error) {
      set({ error: error.message, isLoading: false });
    } finally {
      set({ isLoading: false });
    }
  },

  // SEARCH
  getSearchResults: async (searchQuery) => {
    set({ isLoading: true, error: null });
    try {
      const response = await publicApi.get(
        `/product/search?searchQuery=${searchQuery}`
      );

      const products = response.data;
      return products;
    } catch (error) {
      set({ error: error.message, isLoading: false });
    } finally {
      set({ isLoading: false });
    }
  },

  // Update product
  updateProduct: async (productId, updatedProductData) => {
    set({ isLoading: true });
    try {
      const response = await authorizedApi.put(
        `/product/editProduct/${productId}`,
        updatedProductData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const { message } = response.data;
      toast.success(message);
      // Optionally refetch products to update the store
      await useProductStore.getState().fetchProducts();
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product. Please try again.");
    } finally {
      set({ isLoading: false });
    }
  },

  // Delete product
  deleteProduct: async (productId) => {
    set({ isLoading: true });
    try {
      const response = await authorizedApi.delete(
        `/product/deleteProduct/${productId}`
      );
      const { message } = response.data;
      toast.success(message);
      // Optionally refetch products to update the store
      await useProductStore.getState().fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error(error.response.data.message);
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useProductStore;
