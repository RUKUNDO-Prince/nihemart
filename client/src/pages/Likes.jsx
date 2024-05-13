import React from 'react'
import { ProductsList, SubHeading } from '../components'
import { Link } from 'react-router-dom'
import { likesData } from '../constants/data'
import { deliver } from '../assets'

const Likes = () => {
  return (
    <div className='m-[50px]'>
      <div>
        <h1>WishList(4)</h1>
        <div className='flex gap-5 flex-wrap'>
          {
            likesData.map((item, index) => (
              <div key={index} className='my-[30px] flex flex-col justify-start items-start'>
                <div className='bg-gray-70 bg-opacity-[30%] flex flex-col m-[10px] p-t-[20px] w-[300px] min-h-[300px] rounded-md justify-between'>
                  <img src={item.img} className='m-auto w-[150px]' alt="img" />
                  <button className='bg-[#808080] flex w-full rounded-b-md p-[10px] justify-center items-center'>
                    <img src={deliver} alt="" />
                    <p className='text-white m-0 text-lg'>Order Now</p>
                  </button>
                </div>
                <p className='font-semibold text-lg mx-[10px]'>{item.name}</p>
                <p className='text-primary mx-[10px]'>{item.updatedPrice} frw <span className='text-gray-50 line-through'>{item.price} frw</span></p>

              </div>
            ))
          }
        </div>
      </div>
      <div className=''>
        <div className='flex justify-between'>
          <SubHeading title="Just For You" />
          <Link className='bg-blue2 text-white py-[15px] px-[40px] rounded-md hover:bg-opacity-[80%] transition-all' to="/products">See All</Link>
        </div>
        <ProductsList maxProducts={4} />
      </div>
    </div>
  )
}

export default Likes