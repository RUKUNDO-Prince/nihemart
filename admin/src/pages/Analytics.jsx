import React from 'react'
import { icon } from '../assets'
import { AiOutlineSwapRight } from "react-icons/ai";

const Analytics = () => {
  return (
    <div className='flex-1'>
    <div className='grid grid-rows-1 grid-cols-4 gap-5 w-full p-8 '>
      <div className='bg-white border-[1px] border-gray-90 row-span-1 col-span-1 p-8 rounded-lg '>
        <div className='flex items-center gap-3'>
          <img src={icon} alt="icon" />
          <p className='font-lato font-semibold text-16 text-[#5D6E8B]'>Total products</p>
        </div>
        <p className='font-lato font-semibold text-[48px]'>23</p>
      </div>
      <div className='bg-white border-[1px] border-gray-90 row-span-1 col-span-1 p-8 rounded-lg '>
        <div className='flex items-center gap-3'>
          <img src={icon} alt="icon" />
          <p className='font-lato font-semibold text-16 text-[#5D6E8B]'>Products updated</p>
        </div>
        <p className='font-lato font-semibold text-[48px]'>15</p>
      </div>
      <div className='bg-white border-[1px] border-gray-90 row-span-1 col-span-1 p-8 rounded-lg '>
        <div className='flex items-center gap-3'>
          <img src={icon} alt="icon" />
          <p className='font-lato font-semibold text-16 text-[#5D6E8B]'>Orders</p>
        </div>
        <p className='font-lato font-semibold text-[48px] '>96</p>
      </div>
      <div className='bg-white border-[1px] border-gray-90 row-span-1 col-span-1 p-8 rounded-lg '>
        <div className='flex items-center gap-3'>
          <img src={icon} alt="icon" />
          <p className='font-lato font-semibold text-16 text-[#5D6E8B]'>Categories</p>
        </div>
        <p className='font-lato font-semibold text-[48px]'>9</p>
      </div>
    </div>
    <button className='flex items-center bg-blue3 py-3 px-8 rounded-lg outline-none text-white m-8 float-end hover:bg-blue2'>Log out<AiOutlineSwapRight /></button>
    </div>
  )
}

export default Analytics