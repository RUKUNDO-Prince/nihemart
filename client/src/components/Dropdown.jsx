import React, { useState } from 'react'
// import { categories } from '../constants/data';
import { AiOutlineCaretDown, AiOutlineCaretUp } from 'react-icons/ai'

const Dropdown = ({ data }) => {
    const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='relative flex flex-col items-center w-[340px] h-[340px] rounded-lg'>
        <button onClick={() => setIsOpen((prev) => !prev)} className='bg-blue p-4 w-full flex items-center justify-between font-bold text-lg rounded-lg tracking-wider border-4 border-transparent active:border-white duration-300 active:text-white'>Dropdown {!isOpen ? (<AiOutlineCaretDown className="h-8" />) : (<AiOutlineCaretUp className="h-8" />)}</button>
    </div>
  )
}

export default Dropdown