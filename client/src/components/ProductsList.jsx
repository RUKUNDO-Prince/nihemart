import React from "react";
import ProductCard from "./ProductCard";
import useProductStore from "../store/productStore";

const ProductsList = ({ maxProducts = Infinity, categoryFilter = '', priceRangeFilter = [0, Infinity] }) => {
  const { products, isLoading, error } = useProductStore();

  const filteredProducts = products
    ?.filter((product) => 
      (!categoryFilter || product.category === categoryFilter) &&
      (product.price >= priceRangeFilter[0] && product.price <= priceRangeFilter[1])
    );

  const limitedProducts =
    maxProducts !== Infinity
      ? filteredProducts?.slice(0, maxProducts)
      : filteredProducts;

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
    </>
  );
};

export default ProductsList;
