import React, { useEffect, useState } from "react";
import { FaCaretUp, FaCaretDown } from "react-icons/fa";
import { api } from "../config/axiosInstance";
import { Link, useParams } from 'react-router-dom';
import { Icon } from "@iconify/react/dist/iconify.js";
import { displayNumbers } from "../utils/usableFuncs";
import useProductStore from "../store/productStore";

const ProductCard = ({ product }) => {

  return (
    <div className="h-full">
      <div className="h-full flex flex-col justify-between">
        <div className="flex bg-blue2 bg-opacity-[20%] p-[20px] justify-between max-h-[206.38px] items-start mb-[10px] flex-1 relative">
          <Link to={`/product/${product._id}`} className="m-auto">
            <img
              src={`${api + "/" + product?.photo}`}
              className="max-h-[150px]"
              alt="img"
            />
          </Link>
          <div className="absolute right-0 top-0 flex flex-col p-4 gap-2">
            <Link
              to={`/product/${product._id}`}
              className="p-2 rounded-full bg-white"
            >
              <Icon
                icon={"mdi:eye-outline"}
                className="w-4 h-4 lg:w-6 lg:h-6"
              />
            </Link>
          </div>
        </div>
        <div className="flex justify-between">
          <div>
            <h1 className="font-semibold">{product.name}</h1>
            <div className="flex gap-2">
              <p className="text-primary">
                {displayNumbers(
                  product.priceAfterDiscount
                    ? product.priceAfterDiscount
                    : product.price
                )}
                frw
              </p>
            </div>
          </div>
          <div className="px-2 border border-gray-90 rounded-md flex justify-between items-center gap-2">
            <p>{product.quantity}</p>
            <div>
              <FaCaretUp
                className="cursor-pointer"
              />
              <FaCaretDown
                className="cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
