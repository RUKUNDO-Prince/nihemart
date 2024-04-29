import React, { useState } from 'react'
import { categories } from '../constants/data'
import { search } from '../assets'
import { AiOutlineCaretDown, AiOutlineCaretUp } from 'react-icons/ai';
import { PiCaretDownBold, PiCaretUpBold } from "react-icons/pi";

const Search = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='flex items-center justify-between bg-gray-default rounded-md border-gray-10 p-[10px] gap-2'>
      <form action="" className='flex gap-5'>
        <img src={search} alt="search icon" />
        <input type="text" name="searchQuery" id="searchQuery" placeholder='search' className='bg-transparent outline-none' />
      </form>
      <div className='h-[30px] w-[2px] bg-black'></div>
      <div className='relative flex flex-col items-center rounded-lg'>
        <button className='flex items-center justify-between w-full px-2 duration-300 active:text-gray-60 gap-1' onClick={() => setIsOpen((prev) => !prev)}>categories {isOpen ? (<PiCaretUpBold />) : (<PiCaretDownBold />)}</button>
        {
          isOpen && (
            <div className='absolute top-20 bg-glass flex flex-col items-start rounded-lg p-2 w-[400%]'>
              {categories.map((category, index) => (
                <div className='flex w-full justify-between p-4 hover:bg-glass2 hover:border-l-white border-l-4 cursor-pointer rounded-r-lg border-l-transparent' key={index}>
                  <p>{category.name}</p>
                  <p>{category.icon}</p>
                </div>
              ))}
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Search
