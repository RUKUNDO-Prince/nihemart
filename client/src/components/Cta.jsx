import React from 'react'
import { service, delivery } from '../assets'

const Cta = () => {
  return (
    <div className='flex gap-9 justify-center items-center mb-[50px]'>
      <div className='flex flex-col items-center'>
        <img src={delivery} alt="icon" className='bg-blue2 border-[7px] border-gray-80 rounded-full w-[60px] h-[60px] p-[5px]' />
        <h1 className='font-bold text-[1.2em]'>FAST DELIVERY</h1>
        <p>Fast delivery for all customers all over Rwanda</p>
      </div>
      <div className='flex flex-col items-center'>
        <img src={service} alt="icon" className='bg-blue2 border-[7px] border-gray-80 rounded-full w-[60px] h-[60px] p-[5px]' />
        <h1 className='font-bold text-[1.2em]'>24/7 CUSTOMER SUPPORT</h1>
        <p>Friendly 24/7 customer care services</p>
      </div>
    </div>
  )
}

export default Cta
