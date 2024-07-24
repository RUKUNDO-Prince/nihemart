import React, { useState } from 'react';
import { ProductsList, SubHeading } from '../components';
import { categories } from '../constants/data';

const Products = () => {
  const [categoryFilter, setCategoryFilter] = useState(''); // Category filter state
  const [priceRangeFilter, setPriceRangeFilter] = useState([0, Infinity]); // Price range filter state

  const handleMinPriceChange = (e) => {
    const minPrice = Number(e.target.value) || 0;
    setPriceRangeFilter([minPrice, priceRangeFilter[1]]);
  };

  const handleMaxPriceChange = (e) => {
    const maxPrice = Number(e.target.value) || Infinity;
    setPriceRangeFilter([priceRangeFilter[0], maxPrice]);
  };

  return (
    <div className='p-[50px] flex-1'>
      {/* Flex container for SubHeading and Filters */}
      <div className="flex justify-between items-center mb-4">
        <SubHeading title="Ibicuruzwa byose" />
        <div className="flex gap-4">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="">All Categories</option>
            {
              categories.map((category, index) => (
                <option value={category.name} key={index}>{category.name}</option>
              ))
            }
            {/* Add more categories as needed */}
          </select>

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

      <ProductsList categoryFilter={categoryFilter} priceRangeFilter={priceRangeFilter} />
      <div className='my-9 mx-auto'>
        <button className="bg-blue3 px-5 py-2 md:px-[30px] md:py-[10px] rounded-md text-white hover:bg-blue2">Reba Ibindi</button>
      </div>
    </div>
  );
}

export default Products;
