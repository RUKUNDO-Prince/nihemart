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
    <div className="m-[30px] flex-1 flex flex-col">
      <SubHeading title="Orders" />
      {isLoading ? (
        <div className="flex items-center justify-center flex-1">
          Loading...
        </div>
      ) : orders.length > 0 ? (
        orders && (
          <DataTable
            columns={columns}
            data={orders}
            page={page}
            limit={limit}
          />
        )
      ) : (
        <div className="flex items-center justify-center flex-1">
          there are no orders so far
        </div>
      )}
    </div>
  );
};

export default Orders;
