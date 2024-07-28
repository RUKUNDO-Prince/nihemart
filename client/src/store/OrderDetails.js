import { create } from "zustand";

const useOrderStore = create((set) => ({
  orderDetails: {
    name: "",
    phone: "",
    province: "",
    city: "",
    deliveryFee: 0,
    productDetails: [],
  },
  setOrderDetails: (details) => set({ orderDetails: details }),
  setOrderDetail: (key, value) =>
    set((state) => ({
      orderDetails: { ...state.orderDetails, [key]: value },
    })),
  addProduct: (product) =>
    set((state) => ({
      orderDetails: {
        ...state.orderDetails,
        productDetails: [...state?.orderDetails?.productDetails, product],
      },
    })),
  setProductDetails: (productDetails) =>
    set((state) => ({
      orderDetails: { ...state.orderDetails, productDetails },
    })),

  generateWhatsAppMessage: () => {
    return set((state) => {
      const { phone, province, productDetails, deliveryFee,city } =
        state.orderDetails;
      const totalAmount = productDetails.reduce((acc, product) => {
        return acc + product.price * product.quantity;
      }, 0);

      let message = `Ndashaka kugura igicuruzwa kuri nihemart%0A`;
      message += ` phone: ${phone} %0A`;
      productDetails.forEach((product) => {
        message += `- ${product.name}: ${
          product.price * product.quantity
        } Frw%0A`;
      });
      message += ` Province: ${province}%0A`;
      message += `${province === "Kigali" ? "city: " + city:" "}`;
      message += ` delivary fee: ${deliveryFee} Frw%0A`;
      message += ` Total: ${totalAmount} Frw%0A`;
      return { whatsappMessage: message };
    });
  },
}));

export default useOrderStore;
