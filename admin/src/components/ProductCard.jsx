import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { api } from "../config/axiosInstance";

const StarRating = ({ starCount }) => {
  const fullStars = Math.floor(starCount);
  const hasHalfStar = starCount % 1 !== 0;

  if(starCount === 0){
    return <>
    <FaStar color="grey"/>
    <FaStar color="grey"/>
    <FaStar color="grey"/>
    <FaStar color="grey"/>
    </>
  }

  const stars = [];
  for (let i = 0; i < fullStars; i++) {
    stars.push(<FaStar color="#FE8900" key={i} />);
  }

  if (hasHalfStar) {
    stars.push(<FaStarHalfAlt color="#FE8900" key="half-star" />);
  }

  return <>{stars}</>;
};

const ProductCard = ({ product }) => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <>
      <div className="h-full">
        <div className="h-full flex flex-col justify-between">
          <div className="flex bg-blue2 bg-opacity-[20%] p-[20px] justify-between max-h-[206.38px] items-start  mb-[10px] flex-1 relative">
            <img
              src={`${api + "/" + product?.photo}`}
              className="m-auto max-h-[150px]"
              alt="img"
            />
            <div className="absolute right-0 top-0  flex flex-col p-4 gap-2">
                <div className="p-2 rounded-full bg-white">
                  {isLiked ? (
                    <Icon
                      onClick={() => setIsLiked(false)}
                      icon={"ph:heart-fill"}
                      className=" w-4 h-4 lg:w-6 lg:h-6"
                      color="red"
                    />
                  ) : (
                    <Icon
                      onClick={() => setIsLiked(true)}
                      icon={"solar:heart-linear"}
                      className=" w-4 h-4 lg:w-6 lg:h-6"
                    />
                  )}
                </div>
              
              <Link
                to={`/product/${product._id}`}
                className="p-2 rounded-full bg-white"
              >
                <Icon
                  icon={"mdi:eye-outline"}
                  className=" w-4 h-4 lg:w-6 lg:h-6"
                />
              </Link>
            </div>
          </div>
          <Link to={`/product/${product._id}`}>
            <h1 className="font-semibold">{product.name}</h1>
            <div className="flex gap-2">
              <p className="text-primary">{product.priceAfterDiscount}frw</p>
              <p className="text-gray-80 line-through">{product.price}frw</p>
            </div>
            <div className="flex gap-2 items-center">
              <StarRating starCount={product.averageRating} />
              <p className="text-gray-30">({product.ratings.length})</p>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};
export default ProductCard;
