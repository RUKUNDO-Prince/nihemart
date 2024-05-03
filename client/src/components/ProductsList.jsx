import React from 'react';
import { productsList } from '../constants/data';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { eye, likes } from '../assets';

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
    <div className='flex flex-wrap max-items-4 mt-[40px] justify-between gap-y-5'>
      {limitedProducts.map((product, index) => (
        <div key={index}>
          <div className='flex bg-blue2 bg-opacity-[20%] p-[20px] h-[320px] w-[320px] justify-between items-start  mb-[10px]'>
            <img src={product.img} className='m-auto' alt="img" />
            <div className='flex flex-col gap-2'>
              <img src={likes} alt="icon" className='bg-white p-[7px] w-[40px] hover:bg-opacity-[80%] rounded-full' />
              <img src={eye} alt="icon" className='bg-white p-[7px] w-[40px] hover:bg-opacity-[80%] rounded-full' />
            </div>
          </div>
          <div>
            <h1 className='font-bold text-[1.2em]'>{product.name}</h1>
            <div className='flex gap-2'>
              <p className='text-primary'>{product.updatedPrice}frw</p>
              <p className='text-gray-80 line-through'>{product.price}frw</p>
            </div>
            <div className='flex gap-2 items-center'>
              <StarRating starCount={product.starCount} />
              <p className='text-gray-30'>({product.reviewCount})</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductsList;
