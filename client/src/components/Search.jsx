import React, { useState } from "react";
import { categories } from "../constants/data";
import { search } from "../assets";
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";
import { PiCaretDownBold, PiCaretUpBold } from "react-icons/pi";
import { Icon } from "@iconify/react";

const Search = ({ search = true }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex items-center justify-between bg-gray-default rounded-md border-gray-10 p-[10px] gap-2 relative">
      <form action="" className="flex md:gap-5">
        <Icon icon={"material-symbols-light:search"} className="w-6 h-6" />
        <input
          type="text"
          name="searchQuery"
          
          placeholder="shakisha ibicuruzwa"
          className="bg-transparent outline-none w-full"
        />
      </form>
      <div className="h-[30px] w-[2px] bg-black"></div>
      <div className="flex flex-col items-center rounded-lg">
        <button
          className="flex items-center justify-between w-full px-2 duration-300 active:text-gray-60 gap-1"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          ibyiciro{" "}
          <PiCaretUpBold
            className={`${
              isOpen ? "rotate-180" : "rotate-0"
            } transition-all duration-300`}
          />
        </button>
        {search && (
          <div
            className={`absolute top-20 bg-glass flex right-0 flex-col items-start rounded-lg p-2 w-[100%] z-30 ${
              isOpen ? "scale-100" : "scale-0"
            } origin-top transition-all duration-300 z-40`}
          >
            {categories.map((category, index) => (
              <div
                className="flex w-full justify-between p-2 border border-transparent hover:bg-glass3 cursor-pointer rounded-r-lg border-l-transparent"
                key={index}
              >
                <p>{category.name}</p>
                <p>{category.icon}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
