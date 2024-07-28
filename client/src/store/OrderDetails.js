import { create } from "zustand";

const useOrderStore = create((set) => ({
    orderDetails: {
      name: '',
      phone: '',
      province: '',
      deliveryFee: 0,
      productDetails: [],
    },
    setOrderDetails: (details) => set({ orderDetails: details }),
    setOrderDetail: (key, value) => set((state) => ({
      orderDetails: { ...state.orderDetails, [key]: value },
    })),
    addProduct: (product) => set((state) => ({
        orderDetails: {
          ...state.orderDetails,
          productDetails: [...state?.orderDetails?.productDetails, product],
        },
      })),
    setProductDetails: (productDetails) => set((state) => ({
        orderDetails: { ...state.orderDetails, productDetails },
      })),
  }));

  export default useOrderStore;