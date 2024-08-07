import React, { useEffect, useState } from "react";
import SubHeading from "../components/SubHeading";
import { ordersList } from "../constants/data";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import useOrderStore from "../store/orderStore";
import { displayNumbers } from "../utils/usableFuncs";
import DataTable from "../components/common/DataTable";
import { columns } from "../components/column";


const Orders = () => {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const { orders, getOrders, isLoading } = useOrderStore();

  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(6);
  const handleAuth = () => {
    if (!isAuthenticated) {
      navigate("/signup");
    }
  };
  useEffect(() => {
    handleAuth();
    getOrders();
  }, [navigate, isAuthenticated]);

  console.log(orders);

  return (
    <div className="m-[30px]">
      <SubHeading title="Orders" />
      {isLoading ? (
        <div className="flex items-center justify-center h-[458px]">
          Loading...
        </div>
      ) : orders.length > 0 ? (
        orders && (
          // <div className="my-5 overflow-x-auto">
          //   <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 min-w-[600px] md:min-w-[1012px]">
          //     <thead className="text-[16px] text-black font-poppins drop-shadow-lg my-[20px]">
          //       <tr className="shadow-md">
          //         <th scope="col" className="px-6 py-3">
          //           Orders No ↓
          //         </th>
          //         <th scope="col" className="px-6 py-3">
          //           Customer Name
          //         </th>
          //         <th scope="col" className="px-6 py-3">
          //           Phone Number
          //         </th>
          //         <th scope="col" className="px-6 py-3">
          //           Products Ordered
          //         </th>
          //         <th scope="col" className="px-6 py-3">
          //           Order Quantity
          //         </th>
          //         <th scope="col" className="px-6 py-3">
          //           Price ↑
          //         </th>
          //         <th scope="col" className="px-6 py-3">
          //           Date ↑
          //         </th>
          //         <th scope="col" className="px-6 py-3">
          //           Status
          //         </th>
          //       </tr>
          //     </thead>
          //     <tbody>
          //       {orders.map((order, index) => (
          //         <tr key={index} className="bg-white border-b">
          //           <td className="px-6 py-4">
          //             <p>{index + 1}</p>
          //           </td>
          //           <td className="px-6 py-4">{order.name}</td>
          //           <td className="px-6 py-4">{order.phone}</td>
          //           <td className="px-6 py-4 h-[73px]">
          //             {order.productDetails.map((product, idx) => (
          //               <p key={idx}>{product.name}</p>
          //             ))}
          //           </td>
          //           <td className="px-6 py-4">
          //             {order.productDetails.map((product, idx) => (
          //               <p key={idx}>{product.quantity}</p>
          //             ))}
          //           </td>
          //           <td className="px-6 py-4">
          //             {order.productDetails.map((product, idx) => (
          //               <p key={idx} className="text-nowrap">
          //                 {displayNumbers(product.quantity * product.price)} Frw
          //               </p>
          //             ))}
          //           </td>
          //           <td className="px-6 py-4">{order.date}</td>
          //           <td className="px-6 py-4">
          //             <div
          //               className="p-2 rounded-2xl w-[80%] flex justify-center"
          //               style={getStatusStyles(order.status)}
          //             >
          //               {order.status}
          //             </div>
          //           </td>
          //         </tr>
          //       ))}
          //     </tbody>
          //   </table>
          // </div>
          <DataTable
            columns={columns}
            data={orders}
            page={page}
            limit={limit}
          />
        )
      ) : (
        <div className="flex items-center justify-center h-[458px]">
          there are no orders so far
        </div>
      )}
      {orders.length > 0 && (
        <div className="flex justify-end space-x-5 mt-5">
          <button className="bg-blue3 py-3 w-[120px] rounded-lg text-white hover:bg-blue2">
            Next
          </button>
          <button className="py-3 w-[120px] rounded-lg border-2 border-gray-20">
            Previous
          </button>
        </div>
      )}
    </div>
  );
};

export default Orders;
