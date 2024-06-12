import React, { useEffect } from "react";
import {
  Hero,
  Sidebar,
  Categories,
  Products,
  Arrivals,
  Cta,
} from "../components";
import { categories } from "../constants/data";
import { FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import useAuthStore from "../store/authStore";

const Home = () => {
  // useEffect(()=>{
  //   localStorage.removeItem("authToken");
  // },[])
  return (
    <div>
      <div className=" block lg:hidden">
        <ul className="mb-[20px] flex gap-5 mx-5 md:mx-[50px] overflow-x-scroll py-2 scrollbar">
          {categories.map((category, index) => (
            <li
              key={index}
              className="flex items-center justify-between gap-5 py-2 hover:text-black border border-transparent rounded-md px-3 text-nowrap hover:border hover:border-gray-80 transition-all delay-75 duration-75"
            >
              {category.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-between mx-5 md:mx-[50px]">
        <Sidebar />
        <Hero />
      </div>
      {/* <Categories /> */}
      {/* <div className='w-[95%] h-[2px] bg-gray-90 m-auto'></div> */}
      <Products />
      <Arrivals />
      <Cta />
    </div>
  );
};

export default Home;
