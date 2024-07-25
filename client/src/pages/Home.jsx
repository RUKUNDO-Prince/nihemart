import React, { useEffect, useRef, useState } from "react";
import { Hero, Sidebar, Products, Arrivals, Cta, Categories } from "../components";
import { categories } from "../constants/data";
import useProductStore from "../store/productStore";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

const Home = () => {
  const { fetchProducts } = useProductStore();
  const [currentCategory, setCurrentCategory] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
  };

  return (
    <div>
      <div className="block lg:hidden">
        <div className="relative flex items-center mx-5 md:mx-[50px]">
          <button
            className="absolute top-4 left-[-15px] z-10 p-2 bg-white border border-gray-300 rounded-full shadow-lg hover:bg-gray-90"
            onClick={scrollLeft}
          >
            <AiOutlineLeft />
          </button>
          <ul
            ref={scrollRef}
            className="mb-[20px] flex gap-5 overflow-x-scroll py-2 scrollbar-hide mx-5"
          >
            {categories.map((category, index) => (
              <li
                key={index}
                className={`flex items-center justify-between gap-5 py-2 border border-transparent rounded-md px-3 text-nowrap hover:border hover:border-gray-80 transition-all delay-75 duration-75 ${
                  currentCategory === index ? "bg-primary text-white" : ""
                }`}
                onClick={() => setCurrentCategory(index)}
              >
                {category.name}
              </li>
            ))}
          </ul>
          <button
            className="absolute top-4 right-[-15px] z-10 p-2 bg-white border border-gray-300 rounded-full shadow-lg hover:bg-gray-90"
            onClick={scrollRight}
          >
            <AiOutlineRight />
          </button>
        </div>
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
