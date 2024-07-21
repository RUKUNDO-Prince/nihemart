import React from 'react'
import { service, deliver } from '../assets'

const Cta = () => {
  return (
    <div className='flex gap-9 justify-center flex-col xs:flex-row  mb-[50px] p-5'>
      <div className='flex flex-col items-center justify-between'>
        <img src={deliver} alt="icon" className='bg-blue2 border-[7px] border-gray-80 rounded-full w-[60px] h-[60px] p-[5px]' />
        <h1 className='font-bold text-lg md:text-[1.2em] text-center'>TUBIKUGEZAHO VUBA</h1>
        <p className='text-center'>Tugeza ibicuruzwa byihuse kubakiriya bose hirya no hino mu Rwanda</p>
      </div>
      <div className='flex flex-col items-center justify-between'>
        <img src={service} alt="icon" className='bg-blue2 border-[7px] border-gray-80 rounded-full w-[60px] h-[60px] p-[5px]' />
        <h1 className='font-bold text-lg md:text-[1.2em] text-center'>24/7 CUSTOMER SUPPORT</h1>
        <p className='text-center'>Dutanga serivisi zo kwita ku bakiriya 24/7</p>
      </div>
    </div>
  )
}

export default Cta
