import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { api, authorizedApi } from "../config/axiosInstance";
import { displayNumbers } from "../utils/usableFuncs";
import useAuthStore from "../store/authStore";
import useProductStore from "../store/productStore";
import useLikedProductsStore from "../store/likedProducts";
import { PiHeartFill } from "react-icons/pi";
import { IoHeartOutline } from "react-icons/io5";
import ExpandableText from "./ExpandableText";

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
  const likeProduct = useLikedProductsStore((state) => state.likeProduct);
  const unlikeProduct = useLikedProductsStore((state) => state.unlikeProduct);
  const user = useAuthStore((state) => state.user);
  
  useEffect(() => {
    // Check if the current user liked the product
    if (user) {
      const userLiked = product.likes.some(
        (like) => like.user === user?._id
      );
      setIsLiked(userLiked);
    }else{
      setIsLiked(false);
    }
  }, [user]);

  const handleLikeProduct = async (prodId) => {
    if (!isLiked) {
      setIsLiked(true);
      await likeProduct(prodId);
    } else {
      setIsLiked(false);
      await unlikeProduct(prodId);
    }
  };

  const basePrice = product.price;
  const minPrice = product.variations && product.variations.length > 0
    ? Math.min(basePrice, ...product.variations.map(v => Number(v.price)))
    : basePrice;
  const maxPrice = product.variations && product.variations.length > 0
    ? Math.max(basePrice, ...product.variations.map(v => Number(v.price)))
    : basePrice;

  return (
    <>
      <div className="h-[37vh]">
        <div className="h-full flex flex-col">
          <div className="bg-opacity-[20%] justify-between items-start max-h-[206.38px]  mb-[10px] flex-1 relative">
            <Link className="m-auto w-full h-full" to={`/igicuruzwa/${product._id}`}>
              <img
                src={`${api + "/" + product?.photo}`}
                className="object-center max-h-full w-full"
                alt="img"
                // width={250}
                // height={250}
              />
            </Link>

            {/* <div className="absolute right-0 top-0  flex flex-col p-4 gap-2">
              {
                <div className="p-2 rounded-full bg-white">
                  {isLiked ? (
                    <PiHeartFill
                      onClick={() => handleLikeProduct(product._id)}
                      className=" w-4 h-4 lg:w-6 lg:h-6"
                      color="red"
                    />
                  ) : (
                    <IoHeartOutline
                      onClick={() => handleLikeProduct(product._id)}
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
            </div> */}
          </div>
          <Link to={`/igicuruzwa/${product._id}`}>
            <h1 className="font-semibold">
              {/* <ExpandableText maxChars={23}>{product?.name}</ExpandableText> */}
              {product?.name}
            </h1>
            <div className="flex gap-2">
              <p className="">
                {product.variations && product.variations.length > 0 ? (
                  <>
                    <span>{displayNumbers(minPrice)} frw</span>
                    -
                    <span>{displayNumbers(maxPrice)} frw</span>
                  </>
                ) : (
                  <span>
                    {displayNumbers(product.priceAfterDiscount ? product.priceAfterDiscount : product.price)} frw
                  </span>
                )}
              </p>
              {product.priceAfterDiscount && !product.variations && (
                <p className="text-gray-80 line-through">
                  {displayNumbers(product.price)}frw
                </p>
              )}
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
