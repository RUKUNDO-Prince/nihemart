import React, { useState, useEffect } from "react";
import { logo } from "../assets";
import { Link, useLocation } from "react-router-dom";
import { TbDeviceAnalytics } from "react-icons/tb";
import { MdProductionQuantityLimits } from "react-icons/md";
import { FaTruckFast } from "react-icons/fa6";
import { HiOutlineBell } from "react-icons/hi2";
import { CiSearch } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import Search from "./Search";

const Navbar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="relative bg-white shadow-md border-b border-[#5D6E8B] rounded-xl px-4 py-2 md:px-8 md:py-4">
      {/* Desktop Navbar */}
      <div className="hidden md:flex justify-between items-center">
        <Link to="/">
          <img src={logo} alt="logo" className="w-[80px]" />
        </Link>
        <div>
          <ul className="flex gap-9">
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
        <div className="flex gap-5 items-center">
          <Search />
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="md:hidden flex justify-between items-center">
        <Link to="/">
          <img src={logo} alt="logo" className="w-[60px]" />
        </Link>
        <button onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? (
            <IoMdClose size={30} />
          ) : (
            <IoMdMenu size={30} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-white shadow-lg md:hidden z-50 transform ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="flex justify-between items-center p-4 border-b border-[#5D6E8B]">
          <Link to="/">
            <img src={logo} alt="logo" className="w-[60px]" />
          </Link>
          <button onClick={toggleMobileMenu}>
            <IoMdClose size={30} />
          </button>
        </div>
        <div className="flex flex-col p-4 space-y-4">
          <Link
            to="/"
            className={`flex items-center font-lato font-medium text-[16px] gap-2 ${location.pathname === '/' ? 'text-primary' : 'text-[#5D6E8B]'}`}
          >
            <TbDeviceAnalytics />
            Analytics
          </Link>
          <Link
            to="/products"
            className={`flex items-center font-lato font-medium text-[16px] gap-2 ${location.pathname === '/products' ? 'text-primary' : 'text-[#5D6E8B]'}`}
          >
            <MdProductionQuantityLimits />
            Products
          </Link>
          <Link
            to="/orders"
            className={`flex items-center font-lato font-medium text-[16px] gap-2 ${location.pathname === '/orders' ? 'text-primary' : 'text-[#5D6E8B]'}`}
          >
            <FaTruckFast />
            Orders
          </Link>
          <div className="flex gap-5 items-center">
            <Link to="/notifications">
              <HiOutlineBell size={26} color="#5D6E8B" />
            </Link>
            <Search />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
