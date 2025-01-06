import React, { useEffect } from "react";
import useCartStore from "../store/cartStore";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../config/axiosInstance";
import useAuthStore from "../store/authStore";
import { displayNumbers } from "../utils/usableFuncs";
import useOrderStore from "../store/OrderDetails";
import { toast } from "react-toastify";

const Cart = () => {
  const {
    cartItems,
    fetchCartItems,
    removeFromCart,
    isLoading,
    clearCart,
  } = useCartStore();

  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const setProductDetails = useOrderStore((state) => state.setProductDetails);

  useEffect(() => {
    fetchCartItems();
  }, [user]);

  useEffect(() => {
    if (!user) clearCart();
  }, [user]);

  const cart = cartItems?.cart?.items;

  const handleCartOrder = () => {
    if (user && cart) {
      const productDetails = cart.map(product => ({
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity: product.quantity,
      }));
      setProductDetails(productDetails);
      navigate("/tumiza/agatebo");
      toast.success("Order placed successfully!");
    } else {
      toast.error("Please log in to place an order.");
    }
  };

  return (
    <div className="relative overflow-x-auto m-[10px] scrollbar flex-1">
      {isLoading ? (
        <div className="h-screen flex items-center justify-center">
          Loading...
        </div>
      ) : cartItems?.length !== 0 ? (
        <>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 min-w-[1012px]">
            <thead className="text-[16px] text-black font-poppins drop-shadow-lg my-[20px]">
              <tr className="shadow-md">
                <th scope="col" className="px-6 py-8">Product</th>
                <th scope="col" className="px-6 py-3">Price</th>
                <th scope="col" className="px-6 py-3">Quantity</th>
                <th scope="col" className="px-6 py-3">Subtotal</th>
                <th scope="col" className="px-6 py-3">Remove</th>
              </tr>
            </thead>
            <tbody>
              {cart?.length !== 0 ? (
                cart?.map((item, index) => (
                  <tr key={index} className="bg-white border-b">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex gap-5 items-center">
                      <img
                        src={`${api}/uploads/images/${item.photo}`}
                        className="w-[60px]"
                        alt="img"
                      />{" "}
                      <p className="text-[16px] text-black">{item.name}</p>
                    </th>
                    <td className="px-6 py-4">{displayNumbers(item.price)} Frw</td>
                    <td className="px-6 py-4">{displayNumbers(item.quantity)} items</td>
                    <td className="px-6 py-4">{displayNumbers(item.subtotal)} Frw</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="5" className="text-center">Ntakintu kiri mu gatebo</td></tr>
              )}
            </tbody>
          </table>
          <button
            onClick={handleCartOrder}
            className="bg-blue3 px-5 py-2 md:px-[30px] md:py-[10px] rounded-md text-white hover:bg-blue2 my-5 float-end"
          >
            Tumiza Ibi Bicuruzwa
          </button>
        </>
      ) : (
        <div className="h-[215px] flex items-center justify-center">
          Ntakintu kiri mu gatebo
        </div>
      )}
    </div>
  );
};

export default Cart;
