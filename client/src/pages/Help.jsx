import React from "react";
import { help, search } from "../assets";
import { helpData } from "../constants/data";

const Help = () => {
  return (
    <div className="m-[20px] rounded-lg border-[2px] border-gray-90">
      <div className="bg-gradient-to-r from-blueGradient to-orangeGradient w-full flex justify-around p-[20px] items-center">
        <div className="flex flex-col items-center">
          <h1 className="text-[60px] font-poppins font-bold text-white">
            Help Center
          </h1>
          <p className="text-[20px] font-poppins font-regular text-white">
            Find answers instantly
          </p>
          <form
            action=""
            className="flex gap-5 bg-white m-[20px] px-[10px] py-[7px] min-w-[100%] rounded-md"
          >
            <img src={search} alt="search icon" />
            <input
              type="text"
              name="searchQuery"
              id="searchQuery"
              placeholder="Type your search query"
              className="bg-transparent outline-none"
            />
          </form>
        </div>
        <img src={help} alt="img" />
      </div>
      <div className="p-[20px] flex flex-col items-center gap-5">
        <p className="text-gray-10 mt-[20px]">
          Search above or browse through the topics below to find answers to
          your question
        </p>
        <div className="flex justify-center items-center gap-5 flex-wrap my-[50px]">
          {helpData.map((item, index) => (
            <div key={index} className=" border-[1px] border-gray-90 rounded-md py-[30px] px-[50px] w-[23%] hover:bg-gray-300 h-[30vh] transition-all content-center">
              <h1 className="font-poppins font-medium text-[22px] m-[20px]">{item.title}</h1>
              <p className="font-poppins text-[14px] text-gray-30">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Help;
