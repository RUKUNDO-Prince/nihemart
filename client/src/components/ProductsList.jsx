import React from "react";
import ProductCard from "./ProductCard";
import useProductStore from "../store/productStore";


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
