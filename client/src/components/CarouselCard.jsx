import React from "react";
import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

const CarouselCard = ({
  priductIcon,
  ProductName,
  productImage,
  desc,
  link,
}) => {
  return (
    <div className="flex flex-col md:flex-row h-full p-5 md:p-[50px] gap-5">
      <div className="flex flex-col gap-3 items-center md:items-start">
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
        <h2 className=" text-[28px] md:text-[48px] font-semibold text-[#fafafa] text-center md:text-start">
          {desc}
        </h2>
        <Link
          to={link}
          className="px-5 py-2 border border-transparent hover:border-gray-50 rounded-sm flex items-center gap-3 w-fit transition-all delay-75"
        >
          <span className="font-medium text-[#fafafa]">Shop Now</span>
          <FaArrowRight fontSize={16} color="#fafafa" />
        </Link>
      </div>
      <div className="md:w-[50%] flex items-center justify-center">
        <img src={productImage} alt="ProductImage" className="min-w-[313px]" />
      </div>
    </div>
  );
};

export default CarouselCard;