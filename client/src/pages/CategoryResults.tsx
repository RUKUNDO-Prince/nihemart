import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductsList, SubHeading } from "../components";
import useProductStore from "../store/productStore";

const CategoryResults = () => {
  const [priceRangeFilter, setPriceRangeFilter] = useState([0, Infinity]);
  const fetchProducts = useProductStore((state) => state.fetchProducts);

  const handleMinPriceChange = (e) => {
    const minPrice = Number(e.target.value) || 0;
    setPriceRangeFilter([minPrice, priceRangeFilter[1]]);
  };

  const handleMaxPriceChange = (e) => {
    const maxPrice = Number(e.target.value) || Infinity;
    setPriceRangeFilter([priceRangeFilter[0], maxPrice]);
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  const params = useParams();
  const category = params.category;
  return (
    <section className="flex-1">
      <div className="p-[50px] flex-1">
        <div className="flex justify-between items-center mb-4">
          <SubHeading title={`${category?.toUpperCase()}`} />
          <div className="flex gap-4">
            <input
              type="number"
              placeholder="Min Price"
              onChange={handleMinPriceChange}
              className="p-2 border rounded"
            />
            <input
              type="number"
              placeholder="Max Price"
              onChange={handleMaxPriceChange}
              className="p-2 border rounded"
            />
          </div>
        </div>

        <ProductsList
          categoryFilter={category}
          priceRangeFilter={priceRangeFilter}
        />
      </div>
    </section>
  );
};

export default CategoryResults;
