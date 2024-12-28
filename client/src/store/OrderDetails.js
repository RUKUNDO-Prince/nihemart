import { create } from "zustand";
import { authorizedApi } from "../config/axiosInstance";
import toast from "react-hot-toast";
import { displayNumbers } from "../utils/usableFuncs";

const useOrderStore = create((set,get) => ({
  orderDetails: {
    name: "",
    phone: "",
    province: "",
    city: "",
    deliveryFee: 0,
    productDetails: [],
  },
  success:false,
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
      const { phone, province, productDetails, deliveryFee, city } =
        state.orderDetails;
      const totalAmount = productDetails.reduce((acc, product) => {
        return acc + product.price * product.quantity;
      }, 0);

      let message = `Ndashaka kugura igicuruzwa kuri nihemart%0A`;
      message += ` phone: ${phone} %0A`;
      productDetails.forEach((product) => {
        message += `- ${product.name} (Qty: ${product.quantity}, subtotal: ${displayNumbers(product.quantity * product.price)}) Frw%0A`;
      });
      message += ` Province: ${province}%0A`;
      message += `${province === "Kigali" ? "city: " + city : " "}`;
      message += ` delivery fee: ${deliveryFee} Frw%0A`;
      message += ` Total: ${totalAmount} Frw%0A`;
      return { whatsappMessage: message };
    });
  },

  // Add order to backend using axios
  kigaliOrder: async () => {
    const state = get();
    try {
      const response = await authorizedApi.post(
        "/orders/add",
        state.orderDetails
      );
      if (response.status === 201) {
        toast.success(
          "Murakoze kugura iki gicuruzwa, ibyo mwatumije birabageraho vuba!"
        );
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  },

  // order of other locations

  generalOrder: async () => {
    const state = get();
    try {
      const response = await authorizedApi.post(
        "/orders/add",
        state.orderDetails
      );
      if (response.status === 201) {
        set({ success: true });
        toast.success("Murakoze kugura iki gicuruzwa, ibyo mwatumije birabageraho vuba!");
      } else {
        toast.error("Failed to place order. Please try again.");
      }
    } catch (error) {
      console.error("Error placing order:", error); // Log the error for debugging
      toast.error(error?.response?.data?.error || "An error occurred while placing the order.");
    }
  },

  // Clear the order details
  clearOrderDetails: () =>
    set({
      orderDetails: {
        name: "",
        phone: "",
        province: "",
        city: "",
        deliveryFee: 0,
        productDetails: [],
      },
      success:false
    }),
}));

export default useOrderStore;
