import React from "react";
import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

const CarouselCard = ({
  priductIcon,
  ProductName,
  productImage,
  heading,
  link,
  desc
}) => {
  return (
    <div className="flex flex-col md:flex-row h-full px-5 gap-5 md:justify-between">
      <div className="flex flex-col gap-3 items-center md:items-start py-[50px]">
        {/* product info */}
        <div className="flex items-center gap-5">
          <div>
            <img
              src={priductIcon}
              alt="productIcon"
              className="w-[30px] text-white"
            />
          </div>
          <h2 className="text-base font-poppins text-[#FAFAFA]">
            {ProductName}
          </h2>
        </div>
        <h2 className="text-[28px] md:text-[48px] font-semibold text-[#fafafa] text-center md:text-start">
          {heading}
        </h2>
        <p className="text-white text-[16px] md:text-[20px] my-5">{desc}</p>
        <Link
          to="/ibicuruzwa-byose"
          className="px-5 py-2 border border-[2px] hover:bg-blue3 border-primary rounded-sm flex items-center gap-3 w-fit transition-all delay-75 mt-9"
        >
          <span className="font-medium text-white">Tangira ugure</span>
          <FaArrowRight fontSize={16} color="#fafafa" />
        </Link>
      </div>
      <div className="md:w-[40%] flex items-center justify-center">
        <img src={productImage} alt="ProductImage" className="min-w-[450px] h-[550px]" />
      </div>
    </div>
  );
};

export default CarouselCard;
