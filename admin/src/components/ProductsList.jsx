import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import useProductStore from "../store/productStore";
import { useLocation } from "react-router-dom";

const ProductsList = ({
  categoryFilter = "",
  priceRangeFilter = [0, Infinity],
  showProducts = 12,
}) => {
  const { products, isLoading, error } = useProductStore();
  const [visibleProductsCount, setVisibleProductsCount] = useState(showProducts);

  const location = useLocation();

  const showMoreProducts = () => {
    setVisibleProductsCount((prevCount) => prevCount + 12);
  };

  const sortedProducts = products?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const filteredProducts = sortedProducts?.filter(
    (product) =>
      (!categoryFilter ||
        product.category.toLowerCase() === categoryFilter.toLowerCase()) &&
      product.price >= priceRangeFilter[0] &&
      product.price <= priceRangeFilter[1]
  );

  const limitedProducts =
    visibleProductsCount !== Infinity
      ? filteredProducts?.slice(0, visibleProductsCount)
      : filteredProducts;

  useEffect(() => {
    setVisibleProductsCount(showProducts);
  }, [showProducts]);

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
            <div className="mt-[40px] grid xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
              {limitedProducts.map((product, index) => (
                <ProductCard product={product} key={index} />
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center mt-[40px]">
              <h4>Nta bicuruzwa byari byongerwamo, mukomeze kwihangana😟!</h4>
            </div>
          )}
        </>
      )}
      {(location.pathname !== "/") && (
        <div className="my-9 mx-auto">
          <button
            onClick={showMoreProducts}
            className="bg-blue3 px-5 py-2 md:px-[30px] md:py-[10px] rounded-md text-white hover:bg-blue2"
          >
            View More
          </button>
        </div>
      )}
    </>
  );
};

export default ProductsList;
