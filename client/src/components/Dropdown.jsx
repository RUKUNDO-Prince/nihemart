import React, { useState } from 'react'
// import { categories } from '../constants/data';
import { AiOutlineCaretDown, AiOutlineCaretUp } from 'react-icons/ai'

const Dropdown = ({ data }) => {
    const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='relative flex flex-col items-center rounded-lg'>
        <button onClick={() => setIsOpen((prev) => !prev)} className='bg-blue p-4 w-full flex items-center justify-between font-bold text-lg rounded-lg tracking-wider border-4 border-transparent active:border-white duration-300 active:text-white'>Dropdown {!isOpen ? (<AiOutlineCaretDown className="h-8" />) : (<AiOutlineCaretUp className="h-8" />)}</button>
        {isOpen && (
          <div className='bg-blue absolute top-20 flex flex-col items-start rounded-lg p-2 w-full'>
            {data.map((item, index) => (
              <div className='flex w-full justify-between p-4 hover:bg-primary hover:border-l-white border-l-4 cursor-pointer rounded-r-lg border-l-transparent' key={index}>
                <h3 className='font-bold'>{item.name}</h3>
                <h3>{item.icon}</h3>
              </div>
            ))}
          </div>
        )}
    </div>
  )
}

export default Dropdown