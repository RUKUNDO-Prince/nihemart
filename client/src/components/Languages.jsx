import React, { useState } from 'react'
import { Language } from '../assets'
import { languages } from '../constants/data'
import { PiCaretDownBold, PiCaretUpBold } from "react-icons/pi";

const Languages = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='relative'>
      <button className='flex justify-center items-center gap-1' onClick={() => setIsOpen((prev) => !prev)}><img src={Language} /> {languages[0].name} {isOpen ? (<PiCaretUpBold />) : (<PiCaretDownBold />)}</button>
      {
        isOpen && (
          <div className='absolute top-10 left-10 bg-glass flex flex-col items-start rounded-lg p-2 w-[200%]'>
            {languages.map((language, index) => (
              <div className='flex w-full justify-start gap-5 border border-transparent items-center p-4 hover:bg-glass2 cursor-pointer rounded-lg'>
              <img src={language.icon} className='w-[20px]' alt="icon" />
              <p className='' key={index}>{language.name}</p>
              </div>
            ))}
          </div>
        )
      }
    </div>
  )
}

export default Languages
