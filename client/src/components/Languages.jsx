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
          <div className='absolute top-10 left-10 bg-blue flex flex-col items-start rounded-lg p-2 w-full'>
            {languages.map((language, index) => (
              <p className='flex w-full justify-between p-4 hover:bg-primary cursor-pointer rounded-lg' key={index}>{language.name}</p>
            ))}
          </div>
        )
      }
    </div>
  )
}

export default Languages
