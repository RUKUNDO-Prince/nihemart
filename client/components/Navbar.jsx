import React from "react";
import { logo, cart, cartBg, likes } from "../assets";
import { Link } from "react-router-dom";
import Search from "./Search";
import Languages from "./Languages";

const Navbar = () => {
  return (
    <div className="flex justify-center">
      <img src={logo} alt="logo" />
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/help">Help</Link>
      </nav>
      <Search />
      <Languages />
      <img src={likes} alt="likes" />
      <img src={cartBg} alt="cart" />
    </div>
  );
};

export default Navbar;
