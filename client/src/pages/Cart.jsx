// Cart.jsx
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

  // Fetch cart items when user changes
  useEffect(() => {
    if (user) {
      fetchCartItems();
    }
  }, [user]);

  // Clear cart when user logs out
  useEffect(() => {
    if (!user) clearCart();
  }, [user]);

  const cart = cartItems?.cart?.items;

  const handleCartOrder = () => {
    if (!user) {
      toast.error("Please login first to place an order");
      return;
    }

    if (!cart || cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    const productDetails = cart.map(product => ({
      productId: product.product,
      name: product.name, 
      price: product.price,
      quantity: product.quantity,
      variation: product.selectedVariations || []
    }));

    setProductDetails(productDetails);
    toast.success("Proceeding to checkout...");
    navigate("/tumiza/agatebo");
  };

  return (
    <div className="relative overflow-x-auto m-[10px] scrollbar flex-1">
      {isLoading ? (
        <div className="h-screen flex items-center justify-center">Loading...</div>
      ) : (
        <>
          <table className="w-full text-sm text-left text-gray-500 min-w-[1012px]">
            <thead className="text-[16px] text-black font-poppins drop-shadow-lg">
              <tr className="shadow-md">
                <th scope="col" className="px-6 py-8">Product</th>
                <th scope="col" className="px-6 py-3">Variations</th>
                <th scope="col" className="px-6 py-3">Price</th>
                <th scope="col" className="px-6 py-3">Quantity</th>
                <th scope="col" className="px-6 py-3">Subtotal</th>
                <th scope="col" className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cart?.length > 0 ? (
                cart.map((item) => (
                  <tr key={item._id} className="bg-white border-b">
                    <td className="px-6 py-4 flex gap-4 items-center">
                      <Link to={`/igicuruzwa/${item.product}`}>
                        <img
                          src={`${api}/uploads/images/${item.photo}`}
                          className="w-[60px] h-[60px] object-cover"
                          alt={item.name}
                        />
                      </Link>
                      <Link to={`/igicuruzwa/${item.product}`}>
                        <p className="text-[16px] text-black hover:text-primary">{item.name}</p>
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      {item.selectedVariations?.join(", ") || "N/A"}
                    </td>
                    <td className="px-6 py-4">{displayNumbers(item.price)} Frw</td>
                    <td className="px-6 py-4">{item.quantity}</td>
                    <td className="px-6 py-4">{displayNumbers(item.price * item.quantity)} Frw</td>
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
                <tr>
                  <td colSpan="6" className="text-center py-4">
                    Ntakintu kiri mu gatebo
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {cart?.length > 0 && (
            <button
              onClick={handleCartOrder}
              className="bg-blue3 px-5 py-2 md:px-[30px] md:py-[10px] rounded-md text-white hover:bg-blue2 my-5 float-end"
            >
              Tumiza Ibi Bicuruzwa
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default Cart;