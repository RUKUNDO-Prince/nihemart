import React, { useEffect } from "react";
import { likesData } from "../constants/data";
import useCartStore from "../store/cartStore";
import { Link } from "react-router-dom";
import { api } from "../config/axiosInstance";
import useAuthStore from "../store/authStore";
import { displayNumbers } from "../utils/usableFuncs";

const Cart = () => {
  const { cartItems, addToCart, fetchCartItems, removeFromCart, isLoading } =
    useCartStore();

  const user = useAuthStore((state)=>state.user)

  useEffect(() => {
    fetchCartItems();
  }, [user]);

  const cart = cartItems?.cart?.items;

  return (
    <div className="relative overflow-x-auto m-[10px] scrollbar">
      {isLoading ? (
        <div className="h-screen flex items-center justify-center">
          Loading...
        </div>
      ) : cartItems ? (
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 min-w-[1012px]">
          <thead className="text-[16px] text-black font-poppins drop-shadow-lg my-[20px]">
            <tr className="shadow-md">
              <th scope="col" className="px-6 py-8">
                Product
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Quantity
              </th>
              <th scope="col" className="px-6 py-3">
                Subtotal
              </th>
            </tr>
          </thead>
          <tbody>
            {cartItems ? (
              cart?.map((item, index) => (
                <tr key={index} className="bg-white border-b">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex gap-5 items-center"
                  >
                    <img
                      src={`${api + "/" + item?.photo}`}
                      className="w-[60px]"
                      alt="img"
                    />{" "}
                    <p className="text-[16px] text-black">{item.name}</p>
                  </th>
                  <td className="px-6 py-4">{displayNumbers(item.price)} Frw</td>
                  <td className="px-6 py-4">{displayNumbers(item.quantity)} items</td>
                  <td className="px-6 py-4">{displayNumbers(item.subtotal)} Frw</td>
                </tr>
              ))
            ) : (
              <tr>Ntakintu kiri mu gatebo</tr>
            )}
          </tbody>
        </table>
      ) : (
        <div className="h-[500px] flex items-center justify-center">
          Ntakintu kiri mu gitebo
        </div>
      )}
      <Link
        to="/tumiza"
        className="bg-blue3 px-5 py-2 md:px-[30px] md:py-[10px] rounded-md text-white hover:bg-blue2 my-5 float-end"
      >
        Tumiza Ibi Bicuruzwa
      </Link>
    </div>
  );
};

export default Cart;
