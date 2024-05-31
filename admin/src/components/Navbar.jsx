import React from "react";
import { logo } from "../assets";
import { Link, useLocation } from "react-router-dom";
import { TbDeviceAnalytics } from "react-icons/tb";
import { MdProductionQuantityLimits } from "react-icons/md";
import { FaTruckFast } from "react-icons/fa6";
import { HiOutlineBell } from "react-icons/hi2";
import { CiSearch } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
import { profile } from "../assets";

const Navbar = () => {
  const location = useLocation();

  return (
    <div className="flex justify-between px-8 py-4 items-center border-b-[1px] border-[#5D6E8B] rounded-xl">
      <Link to="/"><img src={logo} alt="logo" /></Link>
      <div className="">
        <ul className="flex justify-between gap-9">
          <Link
            to="/"
            className={`flex items-center font-lato font-medium text-[16px] gap-2 ${location.pathname === '/' ? 'text-primary custom-underline' : 'text-[#5D6E8B]'}`}
          >
            <TbDeviceAnalytics />
            Analytics
          </Link>
          <Link
            to="/products"
            className={`flex items-center font-lato font-medium text-[16px] gap-2 ${location.pathname === '/products' ? 'text-primary custom-underline' : 'text-[#5D6E8B]'}`}
          >
            <MdProductionQuantityLimits />
            Products
          </Link>
          <Link
            to="/orders"
            className={`flex items-center font-lato font-medium text-[16px] gap-2 ${location.pathname === '/orders' ? 'text-primary custom-underline' : 'text-[#5D6E8B]'}`}
          >
            <FaTruckFast />
            Orders
          </Link>
        </ul>
      </div>
      <div className="flex justify-between gap-5 items-center">
        <Link to="/notifications"><HiOutlineBell size={26} color="#5D6E8B" /></Link>
        <CiSearch size={26} color="#5D6E8B" />
        {/* <Link to="/profile"><img src={profile} alt="" className="w-[32px]" /></Link> */}
      </div>
    </div>
  );
};

export default Navbar;
