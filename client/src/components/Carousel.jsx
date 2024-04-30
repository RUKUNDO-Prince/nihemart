import React from 'react'
import { FaChevronCircleDown, FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const Carousel = ({ children: homeSlider }) => {
  return (
    <div className='overflow-hidden relative'>
        <div className='flex'>{homeSlider}</div>
        <div className='absolute inset-0 flex items-center justify-between'>
            <button className='p-1 rounded-full shadow bg-white text-gray-800'><FaChevronLeft size={40} /></button>
            <button className='p-1 rounded-full shadow bg-white text-gray-800'><FaChevronRight size={40} /></button>
        </div>
    </div>
  )
}

export default Carousel