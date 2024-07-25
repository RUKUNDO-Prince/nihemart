import React from "react";
import { ProductsList, SubHeading } from "../components";
import { Link } from "react-router-dom";
import { likesData } from "../constants/data";
import { deliver } from "../assets";

const Likes = () => {
  return (
    <div className=" p-[20px] md:p-[50px]">
      <div className="pb-10">
        <h1 className="pb-4">WishList(4)</h1>
        <div className="grid xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {likesData.map((item, index) => (
            <div key={index} className="flex flex-col">
              <div className="bg-gray-70 bg-opacity-[30%] flex flex-col  rounded-md justify-between flex-1">
                <div className="w-full flex items-center justify-center overflow-hidden">
                  <img src={item.img} className="w-[40%] m-5" alt="img" />
                </div>
                <Link
                  to="/tumiza/:id"
                  className="bg-[#808080] flex w-full rounded-b-md p-[10px] justify-center gap-3 items-center"
                >
                  <img src={deliver} alt=""  />
                  <p className="text-white m-0 text-lg">Tumiza ubungubu</p>
                </Link>
              </div>
              <div className="flex justify-between my-2">
                <p className="font-semibold text-lg mx-[10px]">{item.name}</p>
                <p className="text-primary mx-[10px]">
                  {item.updatedPrice} frw{" "}
                  <span className="text-gray-50 line-through">
                    {item.price} frw
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="">
        <div className="flex justify-between">
          <SubHeading title="Just For You" />
          <Link
            className="bg-blue2 text-white py-[10px] px-[40px] rounded-md hover:bg-opacity-[80%] transition-all"
            to="/ibicuruzwa-byose"
          >
            Reba Byose
          </Link>
        </div>
        <ProductsList visibleProductsCount={4} />
      </div>
    </div>
  );
};

export default Likes;
