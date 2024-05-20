import React from "react";
import { homeSlider } from "../constants/data";
import { FaArrowRightLong } from "react-icons/fa6";

const Hero = () => {
  return (
    <div className="bg-gradient-to-r from-blueGradient to-orangeGradient w-full lg:w-[80%] p-[20px] md:p-[50px] h-fit">
      {homeSlider.map((item, index) => (
        <div className="flex justify-between flex-col sm:flex-row items-center md:items-start gap-5" key={index}>
          <div className="">
            <div className="flex gap-5 items-center justify-center md:justify-start mb-4">
              <img src={item.icon} alt="icon" className="w-[30px] text-white" />
              <h1 className="text-white font-semibold text-[1.1em] ">
                {item.name}
              </h1>
            </div>
            <p className="text-white text-[2em] md:text-[3em] lg:text-[4em]/[65px] font-semibold text-center md:text-start ">
              {item.heading}
            </p>
            <div className="flex items-center justify-center md:justify-start mt-5">
              <a href="/products" className="text-white link flex items-center gap-3">
                Shop now
              <FaArrowRightLong color="#fff" />
              </a>
            </div>
          </div>
          <div>
            <img src={item.image} alt="" className="min-w-[342px]" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Hero;
