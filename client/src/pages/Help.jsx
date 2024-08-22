import React from "react";
import { help2, search } from "../assets";
import { helpData } from "../constants/data";
import { useTranslation } from "react-i18next";

const Help = () => {
  const { t } = useTranslation();

  return (
    <div className="m-[20px] rounded-lg border-[2px] border-gray-90">
      <div className="bg-gradient-to-r from-blueGradient to-orangeGradient w-full flex items-center flex-col md:flex-row">
        <div className="flex flex-col items-center md:w-[50%]">
          <h1 className="text-[60px] font-poppins font-bold text-white">
            {t('where')}
          </h1>
          <p className="text-[20px] font-poppins font-regular text-white">
            {t('answers')}
          </p>
          <form
            action=""
            className="flex gap-5 bg-white m-[20px] px-[10px] py-[7px] rounded-md"
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
        <div className="justify-self-end md:w-[50%] flex justify-center md:justify-end">
        {/* <img src={help} className="md:w-[300px] mt-4" alt="img" /> */}
        <img src={help2} className="md:w-[300px]" alt="img" />
        </div>
      </div>
      <div className="p-[20px] flex flex-col items-center gap-5">
        <p className="text-gray-10 mt-[20px]">
          {t('searchAbove')}
        </p>
        <div className=" my-[50px] grid xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {helpData.map((item, index) => (
            <div key={index} className=" border-[1px] border-gray-90 rounded-md p-[30px] hover:bg-gray-300 transition-all">
              <h1 className="font-poppins font-medium text-[18px] my-[20px]">{item.title}</h1>
              <p className="font-poppins text-[14px] text-gray-30">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Help;
