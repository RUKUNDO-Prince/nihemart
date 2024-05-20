import React, { useState } from "react";
import { logo, cart, cartBg, likes } from "../assets";
import { Link, NavLink } from "react-router-dom";
import Search from "./Search";
import Languages from "./Languages";
import { Icon } from "@iconify/react";

const Navbar = () => {
  const [search, setSearch] = useState(false);
  return (
    <div className="flex justify-between gap-3 items-center m-5 shadow-lg rounded-lg px-5 relative">
      <Link to="/" className="w-[82px] h-[87px]">
        <img
          src={logo}
          alt="logo"
          className=" min-w-[60px] min-h-[67px] w-[82px] h-[87px] object-contain"
        />
      </Link>

      <ul className=" hidden md:flex gap-5 xl:gap-10">
        <NavLink
          exact
          to={"/"}
          activeclassname="active"
          className="hover:text-primary transition-colors"
        >
          Home
        </NavLink>
        <NavLink
          to={"/about"}
          activeclassname="active"
          className="hover:text-primary transition-colors"
        >
          About
        </NavLink>
        <NavLink
          to={"/contact"}
          activeclassname="active"
          className="hover:text-primary transition-colors"
        >
          Contact
        </NavLink>
        <NavLink
          to={"/help"}
          activeclassname="active"
          className="hover:text-primary transition-colors"
        >
          Help
        </NavLink>
      </ul>

      <div className="hidden xl:block">
        <Search />
      </div>
      <div className="flex gap-5 items-center">
        <div
          className="flex items-center justify-center xl:hidden p-2 rounded-full hover:bg-gray-100"
          onClick={() => setSearch(true)}
        >
          <Icon icon={"material-symbols-light:search"} className="w-6 h-6" />
        </div>
        <Languages />
        <Link
          to={"/likes"}
          className="w-10 h-10 flex items-center justify-center"
        >
          <Icon
            icon={"solar:heart-outline"}
            className="w-5 h-5 lg:h-6 lg:w-6"
          />
        </Link>
        <Link
          to={"/cart"}
          className="w-10 h-10 flex items-center justify-center bg-[#3B9DF8] rounded-full"
        >
          <Icon
            icon={"ion:cart-outline"}
            className="w-5 h-5 lg:h-6 lg:w-6"
            color="white"
          />
        </Link>
        <div
          className="flex items-center justify-center md:hidden p-2 rounded-full hover:bg-gray-100"
          onClick={() => setSearch(false)}
        >
          <Icon icon={"clarity:bars-line"} fontSize={24} />
        </div>

      </div>
      <div
        className={` xl:hidden absolute bg-white p-4 w-full flex items-center justify-center gap-4 ${
          search ? "top-0" : "-top-[100%]"
        } transition-all duration-100`}
      >
        <div className="md:w-[60%] border">
          <Search />
        </div>
        <div
          className="flex items-center justify-center p-2 rounded-full hover:bg-gray-100"
          onClick={() => setSearch(false)}
        >
          <Icon icon={"iconoir:cancel"} fontSize={24} />
        </div>
        
      </div>
    </div>
  );
};

export default Navbar;
