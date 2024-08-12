import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import useProductStore from "../store/productStore";
import { useLocation } from "react-router-dom";

const ProductsList = ({
  categoryFilter = "",
  subcategoryFilter = "",
  priceRangeFilter = [0, Infinity],
  showProducts = 12, // Default value is 12
}) => {
  const { products, isLoading, error } = useProductStore();
  const [visibleProductsCount, setVisibleProductsCount] = useState(showProducts);

  const location = useLocation();

  const showMoreProducts = () => {
    setVisibleProductsCount((prevCount) => prevCount + 12);
  };

  const sortedProducts = products?.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const filteredProducts = sortedProducts?.filter((product) => {
    const categoryMatch = !categoryFilter || product.category.toLowerCase() === categoryFilter.toLowerCase();
    const subcategoryMatch = !subcategoryFilter || product.subcategory?.toLowerCase() === subcategoryFilter.toLowerCase();
    const priceMatch = product.price >= priceRangeFilter[0] && product.price <= priceRangeFilter[1];

    return categoryMatch && subcategoryMatch && priceMatch;
  });

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
              <h4>No products found 😟!</h4>
            </div>
          )}
        </>
      )}
      {location.pathname !== "/" && filteredProducts.length > visibleProductsCount && (
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
