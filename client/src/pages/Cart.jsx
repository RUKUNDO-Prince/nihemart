import React, { useEffect } from "react";
import { likesData } from "../constants/data";
import useCartStore from "../store/cartStore";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cartItems, addToCart, fetchCartItems, removeFromCart } =
    useCartStore();

    useEffect(()=>{
        fetchCartItems();
    },[])

    const cart = cartItems?.cart?.items;
  return (
    <div className="relative overflow-x-auto m-[10px] scrollbar">
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
          { cartItems && likesData.map((item, index) => (
            <tr key={index} className="bg-white border-b">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex gap-5 items-center"
              >
                <img src={item.img} className="w-[60px]" alt="img" />{" "}
                <p className="text-[16px]">{item.name}</p>
              </th>
              <td className="px-6 py-4">{item.price}</td>
              <td className="px-6 py-4">{item.quantity}</td>
              <td className="px-6 py-4">{item.updatedPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/tumiza" className="bg-blue3 px-5 py-2 md:px-[30px] md:py-[10px] rounded-md text-white hover:bg-blue2 my-5 float-end">Tumiza Ibi Bicuruzwa</Link>
    </div>
  );
};

export default Cart;
