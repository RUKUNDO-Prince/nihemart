import React from "react";
import { productsList } from "../constants/data";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import ProductCard from "./ProductCard";
import useProductStore from "../store/productStore";

const StarRating = ({ starCount }) => {

  const fullStars = Math.floor(starCount);
  const hasHalfStar = starCount % 1 !== 0;

  const stars = [];
  for (let i = 0; i < fullStars; i++) {
    stars.push(<FaStar color="#FE8900" key={i} />);
  }

  if (hasHalfStar) {
    stars.push(<FaStarHalfAlt color="#FE8900" key="half-star" />);
  }

  return <>{stars}</>;
};


const ProductsList = ({ maxProducts = Infinity }) => {
  const { products, isLoading, error } = useProductStore();

  const limitedProducts =
    maxProducts !== Infinity
      ? products?.slice(0, maxProducts)
      : products;

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center">
          <h4>Loading...</h4>
        </div>
      ) : error ? (
        <div className="flex items-center justify-center">
          <h4>{error}</h4>
        </div>
      ) : (
        <>
          {limitedProducts.length > 0 ? (
            <div className="mt-[40px] grid xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {limitedProducts.map((product, index) => (
                <ProductCard product={product} key={index} />
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center mt-[40px]">
              <h4>currently there are no products added</h4>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ProductsList;
