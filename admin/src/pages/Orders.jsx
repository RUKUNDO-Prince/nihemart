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
  const [sortBy, setSortBy] = useState("date");

  const handleAuth = () => {
    if (!isAuthenticated) {
      navigate("/signup");
    }
  };

  useEffect(() => {
    handleAuth();
    getOrders();
  }, [navigate, isAuthenticated]);

  // Ensure orders are sorted by createdAt timestamp (most recent first)
  const sortedOrders = orders.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    getOrders(e.target.value); // Fetch orders with selected sorting
  };

  return (
    <div className="m-[30px] flex-1 flex flex-col">
      <SubHeading title="Orders" />
      
      {/* Sort Dropdown Styling */}
      <div className="flex items-center space-x-4 my-4">
        <span className="text-sm text-gray-600">Sort by:</span>
        <select
          onChange={handleSortChange}
          value={sortBy}
          className="bg-white border border-gray-300 text-gray-700 p-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary">
          <option value="date">Date</option>
          <option value="category">Category</option>
          <option value="status">Status</option>
        </select>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center flex-1">
          Loading...
        </div>
      ) : orders.length > 0 ? (
        sortedOrders && (
          <DataTable
            columns={columns}
            data={sortedOrders}
            page={page}
            limit={limit}
          />
        )
      ) : (
        <div className="flex items-center justify-center flex-1">
          There are no orders so far
        </div>
      )}
    </div>
  );
};

export default Orders;
