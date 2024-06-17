import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import useAuthStore from "../store/authStore";
import AuthForm from "./AuthForm";
import { api } from "../config/axiosInstance";

export const StarRating = ({ starCount }) => {
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
  const { isAuthenticated } = useAuthStore();
  const [isLiked, setIsLiked] = useState(false);

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleClose = (e) => {
    if (e.target.id === "modal") setIsLoginModalOpen(false);
  };

  return (
    <>
      <div className="h-full">
        <div className="h-full flex flex-col justify-between">
          <div className="flex bg-blue2 bg-opacity-[20%] p-[20px] justify-between items-start  mb-[10px] flex-1 relative">
            <img
              src={`${api + "/" + product?.photo}`}
              className="m-auto"
              alt="img"
            />
            <div className="absolute right-0 top-0  flex flex-col p-4 gap-2">
              {isAuthenticated ? (
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
              ) : (
                <div className="p-2 rounded-full bg-white">
                  <Icon
                    onClick={() => setIsLoginModalOpen(true)}
                    icon={"solar:heart-linear"}
                    className=" w-4 h-4 lg:w-6 lg:h-6"
                  />
                </div>
              )}
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
      <div
        id="modal"
        onClick={handleClose}
        className={` ${
          !isAuthenticated && isLoginModalOpen ? "block" : "hidden"
        } fixed inset-0 bg-black bg-opacity-10 z-50 flex items-center justify-center backdrop-blur-[2px] transition-all delay-100  duration-200`}
      ></div>
      {/* login and sign up */}
      <div
        className={` ${
          !isAuthenticated && isLoginModalOpen
            ? "scale-100 origin-center transition-all duration-200"
            : "scale-0"
        } fixed w-[90%] md:w-2/3 lg:w-1/2 z-50 mx-auto top-16 left-[5%] md:left-[20%] lg:left-[25%] flex justify-center`}
      >
        <AuthForm />
      </div>
    </>
  );
};

export default ProductCard;
