import React from 'react'
import { push } from '../assets'

const Newsletter = () => {
  return (
    <div className='flex flex-col justify-center items-center p-5'>
      <h1 className='text-white my-5 font-semibold text-[24px] md:text-[3em] font-poppins'>Subscribe to our newsletter</h1>
      <p className='text-white text-center md:text-start'>Keep updated on new Products and whatever happening on Nihe Mart </p>
      <div className='md:w-[40%] flex justify-between p-[5px] items-center my-5 border-none rounded-md bg-glass3'>
        <input type="email" placeholder='Email address' className='bg-transparent w-full outline-none text-white mx-2' />
        <button className='bg-blue2 p-[10px] rounded-md'><img src={push} alt="icon" /></button>
      </div>
    </div>
  )
}

export default Newsletter