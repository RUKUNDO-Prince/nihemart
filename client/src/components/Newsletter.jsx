import React from 'react'
import { push } from '../assets'

const Newsletter = () => {
  return (
    <div className='flex flex-col justify-center items-center my-5'>
      <h1 className='text-white my-5 font-libre font-semibold text-[3em]'>Subscribe to our newsletter</h1>
      <p className='text-white '>Keep updated on new Products and whatever happening on Nihe Mart </p>
      <div className='w-[40%] flex justify-between p-[5px] items-center my-5 border-none rounded-md bg-glass2'>
        <input type="email" placeholder='Email address' className='bg-transparent w-full outline-none text-white mx-2' />
        <button className='bg-blue2 p-[10px] rounded-md'><img src={push} alt="icon" /></button>
      </div>
    </div>
  )
}

export default Newsletter