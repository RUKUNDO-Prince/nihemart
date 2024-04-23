import React from "react";
import { logo, cart, cartBg, likes } from "../../assets";
import { Link } from "react-router-dom";
import Search from "./Search";
import Languages from "./Languages";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between bg-red-900">
      <img src={logo} alt="logo" className="h-12" />
      <div className="space-x-4">
        <Link to="/" className="text-gray-700 hover:text-gray-900">Home</Link>
        <Link to="/about" className="text-gray-700 hover:text-gray-900">About</Link>
        <Link to="/contact" className="text-gray-700 hover:text-gray-900">Contact</Link>
        <Link to="/help" className="text-gray-700 hover:text-gray-900">Help</Link>
      </div>
      <Search />
      <Languages />
      <img src={likes} alt="likes" className="w-6 h-6" />
      <img src={cartBg} alt="cart" className="w-6 h-6" />
    </nav>
  );
};

export default Navbar;
