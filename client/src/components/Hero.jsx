import React from "react";
import { homeSlider } from "../constants/data";
import { FaArrowRightLong } from "react-icons/fa6";

const Hero = () => {
  return (
    <div className="bg-gradient-to-r from-blueGradient to-orangeGradient w-[80%] p-[50px] h-[50vh]">
      {homeSlider.map((item, index) => (
        <div className="flex justify-between items-start">
          <div className="w-[40%]">
            <div className="flex gap-5 items-center justify-start mb-4">
              <img src={item.icon} alt="icon" className="w-[30px] text-white" />
              <h1 className="text-white font-semibold text-[1.1em]">
                {item.name}
              </h1>
            </div>
            <p className="text-white text-[4em]/[65px] font-semibold ">
              {item.heading}
            </p>
            <div className="flex items-center gap-3 mt-5">
              <a href="/" className="text-white link">
                Shop now
              </a>
              <FaArrowRightLong color="#fff" />
            </div>
          </div>
          <div>
            <img src={item.image} alt="" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Hero;
