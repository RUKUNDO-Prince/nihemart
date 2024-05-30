import React from 'react';
import { productsList } from '../constants/data';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import ProductCard from './ProductCard';


const StarRating = ({ starCount }) => {
  const fullStars = Math.floor(starCount);
  const hasHalfStar = starCount % 1 !== 0;

  const stars = [];
  for (let i = 0; i < fullStars; i++) {
    stars.push(<FaStar color='#FE8900' key={i} />);
  }

  if (hasHalfStar) {
    stars.push(<FaStarHalfAlt color='#FE8900' key="half-star" />);
  }

  return <>{stars}</>;
};

const ProductsList = ({ maxProducts = Infinity }) => {
  const limitedProducts = maxProducts !== Infinity ? productsList.slice(0, maxProducts) : productsList;

  return (
    <div className='mt-[40px] grid xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
      {limitedProducts.map((product, index) => (
        <ProductCard product={product} key={index} />
      ))}
    </div>
  );
};

export default ProductsList;
