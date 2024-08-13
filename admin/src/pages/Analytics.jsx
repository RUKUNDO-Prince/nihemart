import React, { useEffect, useState } from "react";
import { icon } from "../assets";
import { AiOutlineSwapRight } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import { getAdminDashboardStats } from "../services/dashboard";
import { categories } from "../constants/data";

const Analytics = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState({});
  const handleAuth = () => {
    if (!isAuthenticated) {
      navigate("/signup");
    }
  };
  useEffect(() => {
    handleAuth();
  }, [navigate, isAuthenticated]);

  useEffect(() => {
    // getting admin dashboard stats
    const getStats = async () => {
      setIsLoading(true);
      try {
        const response = await getAdminDashboardStats();
        setStats(response);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getStats();
  }, []);

  
  return (
    <div className="flex-1 flex flex-col">
      {isLoading ? (
        <div className="flex-1 flex items-center justify-center">
          Loading...
        </div>
      ) : (
        stats && (
          <div className="grid grid-rows-1 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 w-full p-8 ">
            <div className="bg-white border-[1px] border-gray-90 row-span-1 col-span-1 p-8 rounded-lg">
              <div className="flex items-center md:gap-3 gap-2 md:justify-normal">
                <img src={icon} alt="icon" />
                <p className="font-lato font-semibold text-16 text-[#5D6E8B]">
                  Total products
                </p>
              </div>
              <p className="font-lato font-semibold md:text-[48px] text-[38px]">
                {stats?.totalProducts}
              </p>
            </div>
            <div className="bg-white border-[1px] border-gray-90 row-span-1 col-span-1 p-8 rounded-lg ">
              <div className="flex items-center md:gap-3 gap-2 md:justify-normal">
                <img src={icon} alt="icon" />
                <p className="font-lato font-semibold text-16 text-[#5D6E8B]">
                  Products updated
                </p>
              </div>
              <p className="font-lato font-semibold md:text-[48px] text-[38px]">
                {stats?.updatedProducts}
              </p>
            </div>
            <div className="bg-white border-[1px] border-gray-90 row-span-1 col-span-1 p-8 rounded-lg ">
              <div className="flex items-center gap-3">
                <img src={icon} alt="icon" />
                <p className="font-lato font-semibold text-16 text-[#5D6E8B]">
                  Orders
                </p>
              </div>
              <p className="font-lato font-semibold md:text-[48px] text-[38px]">
                {stats?.totalOrders}
              </p>
            </div>
            <div className="bg-white border-[1px] border-gray-90 row-span-1 col-span-1 p-8 rounded-lg ">
              <div className="flex items-center md:gap-3 gap-2 md:justify-normal">
                <img src={icon} alt="icon" />
                <p className="font-lato font-semibold text-16 text-[#5D6E8B]">
                  Categories
                </p>
              </div>
              <p className="font-lato font-semibold md:text-[48px] text-[38px]">
                {categories.length}
              </p>
            </div>
          </div>
        )
      )}
      <button
        onClick={() => logout()}
        className="flex items-center w-fit self-end bg-blue3 py-3 px-8 rounded-lg outline-none text-white m-8 float-end hover:bg-blue2"
      >
        Log out
        <AiOutlineSwapRight />
      </button>
    </div>
  );
};

export default Analytics;
