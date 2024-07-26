import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { api } from "../config/axiosInstance";
import { displayNumbers } from "../utils/usableFuncs";

export const StarRating = ({ starCount }) => {
  const fullStars = Math.floor(starCount);
  const hasHalfStar = starCount % 1 !== 0;

  if (starCount === 0) {
    return (
      <>
        <FaStar color="grey" />
        <FaStar color="grey" />
        <FaStar color="grey" />
        <FaStar color="grey" />
      </>
    );
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
      <div className="h-[37vh]">
        <div className="h-full flex flex-col">
          <div className="flex bg-blue2 bg-opacity-[20%] p-[20px] justify-between items-start max-h-[206.38px]  mb-[10px] flex-1 relative">
            <Link className="m-auto" to={`/igicuruzwa/${product._id}`}>
              <img
                src={`${api + "/" + product?.photo}`}
                className="max-h-[150px] object-cover"
                alt="img"
              />
            </Link>

            <div className="absolute right-0 top-0  flex flex-col p-4 gap-2">
              {
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
              }
              <Link
                to={`/igicuruzwa/${product._id}`}
                className="p-2 rounded-full bg-white"
              >
                <Icon
                  icon={"mdi:eye-outline"}
                  className=" w-4 h-4 lg:w-6 lg:h-6"
                />
              </Link>
            </div>
          </div>
          <Link to={`/igicuruzwa/${product._id}`}>
            <h1 className="font-semibold">{product.name}</h1>
            <div className="flex gap-2">
              <p className="text-primary">
                {displayNumbers(product.priceAfterDiscount
                  ? product.priceAfterDiscount
                  : product.price)}
                frw
              </p>
              {product.priceAfterDiscount && (
                <p className="text-gray-80 line-through">{displayNumbers(product.price)}frw</p>
              )}
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
