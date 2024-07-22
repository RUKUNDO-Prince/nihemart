import React, { useEffect } from "react";
import SubHeading from "../components/SubHeading";
import { ordersList } from "../constants/data";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

const getStatusStyles = (status) => {
  switch (status) {
    case "completed":
      return { color: "green", backgroundColor: "#e0f7e9" };
    case "waiting":
      return { color: "orange", backgroundColor: "#fff5e6" };
    case "canceled":
      return { color: "red", backgroundColor: "#fdecea" };
    default:
      return { color: "black", backgroundColor: "#ffffff" }; // default styles if status doesn't match
  }
};

const Orders = () => {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const handleAuth = () => {
    if (!isAuthenticated) {
      navigate("/signup");
    }
  };
  useEffect(() => {
    handleAuth();
  }, [navigate, isAuthenticated]);
  return (
    <div className="m-[30px]">
      <SubHeading title="Orders" />
      <div className="my-5">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 min-w-[1012px]">
          <thead className="text-[16px] text-black font-poppins drop-shadow-lg my-[20px]">
            <tr className="shadow-md">
              <th scope="col" className="px-6 py-8">
                Orders No ↓
              </th>
              <th scope="col" className="px-6 py-3">
                Customer Name
              </th>
              <th scope="col" className="px-6 py-3">
                Phone Number
              </th>
              <th scope="col" className="px-6 py-3">
                Products Ordered
              </th>
              <th scope="col" className="px-6 py-3">
                Order Quantity
              </th>
              <th scope="col" className="px-6 py-3">
                Price ↑
              </th>
              <th scope="col" className="px-6 py-3">
                Date ↑
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {ordersList.map((item, index) => (
              <tr key={index} className="bg-white border-b">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex gap-5 items-center"
                >
                  <p>{item.id}</p>
                </th>
                <td className="px-6 py-4">{item.name}</td>
                <td className="px-6 py-4">{item.phone}</td>
                <td className="px-6 py-4">{item.productsOrdered}</td>
                <td className="px-9 py-4">{item.orderedQuantity}</td>
                <td className="px-6 py-4">{item.price}</td>
                <td className="px-6 py-4">{item.date}</td>
                <td className="px-6 py-4">
                  <div className="p-2 rounded-2xl w-[80%] flex justify-center" style={getStatusStyles(item.status)}>{item.status}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="flex justify-center items-center bg-blue3 py-3 w-[120px] rounded-lg outline-none text-white my-0 float-right hover:bg-blue2">
        Next
      </button>
      <button className="flex justify-center items-center py-3 w-[120px] rounded-lg outline-none my-0 float-right border-2 border-gray-20 mx-5">
        Previous
      </button>
    </div>
  );
};

export default Orders;
