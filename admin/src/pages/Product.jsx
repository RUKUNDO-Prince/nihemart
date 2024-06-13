import React from 'react'
import { anonymous, draft, tick } from '../assets'

const Product = () => {
  return (
    <div className='flex-1 m-[30px]'>
      <div className='flex justify-between'>
        <p className='font-poppins font-semibold text-[16px] text-primary flex items-center gap-3'><img src={anonymous} alt="icon" /> Add New Product</p>
        <div className='flex gap-5'>
          <button className='border-2 border-gray-90 text-black p-4 rounded-lg flex items-center hover:bg-gray-90 gap-3 h-12'><img src={draft} alt="draft" />Save Draft</button>
          <button className='bg-blue2 text-white px-5 h-12 rounded-lg flex items-center hover:bg-blue3 gap-3'><img src={tick} alt="tick" />Add Product</button>
        </div>
      </div>
      <div>
        <div>
          <h1>General Information</h1>
          <div>
            <form action="">
              <div>
                <label htmlFor="">Product Name</label>
                <input type="text" placeholder='Havic HV G-92 Gamepad' />
              </div>
              <div>
                <label htmlFor="">Product Description</label>
                <textarea type="text" placeholder='PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble free install & mess free removal Pressure sensitive.'></textarea>
              </div>
            </form>
            <div>
              <h1>Size</h1>
              <p>Pick available sizes</p>
              <ul>
                <li>XS</li>
                <li>M</li>
                <li>S</li>
                <li>L</li>
                <li>XL</li>
              </ul>
            </div>
            <div>
              <h1>Gender</h1>
              <p>Pick available gender</p>
              <input type="checkbox" name="Men" id="" /><label htmlFor="">Men</label>
              <input type="checkbox" name="Women" id="" /><label htmlFor="">Women</label>
              <input type="checkbox" name="Unisex" id="" /><label htmlFor="">Unisex</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product