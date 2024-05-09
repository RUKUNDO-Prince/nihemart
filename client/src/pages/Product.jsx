import React from 'react'
import { productsList, singleProduct } from '../constants/data'
import { FaPlus, FaMinus  } from "react-icons/fa6";
import { delivery, whatsapp, circle } from '../assets';
import { ProductsList, SubHeading } from '../components';


const Product = () => {
  return (
    <div className='m-[40px]'>
      {
        singleProduct.map((item, index) => (
          <div key={index}>
            <p className='m-[20px] text-gray-90'>/   {item.category}      /       <span className='text-black'>{item.name}</span></p>
            <div className='flex max-h-[100vh] justify-between'>
              <div className='w-[15%] min-h-full flex gap-5 flex-col my-[10px]'>
                {
                  item.imgs.map((img, index) => (
                    <img className='bg-gray-90 bg-opacity-[30%] p-[20px] hover:bg-opacity-[20%] w-full' src={img} alt="img" key={index} />
                  ))
                }
              </div>
              <div className='bg-gray-90 bg-opacity-[30%] content-center px-[40px] my-[10px]  mx-[20px] hover:bg-opacity-[20%] w-[70%]'><img src={item.img} alt="item" /></div>
              <div className='px-[50px] flex flex-col gap-3'>
                <h1 className='text-[24px] font-semibold'>{item.name}</h1>
                <div className='flex gap-3'>
                  <p>{item.starCount}</p>
                  <p className='text-gray-90'>({item.reviewCount})</p> | 
                  <p className='text-[#00FF66]'>{item.isAvailable ? "In Stock" : "Waiting for more"}</p>
                </div>
                <p className='text-primary font-semibold text-[24px]'>{item.updatedPrice} frw <span className='text-gray-90 line-through'>{item.price} frw</span></p>
                <p className='text-black text-[16px]'>{item.desc}</p>
                <hr />
                <p className='font-semibold text-[24px]'>Size: </p>
                <div className='flex gap-5'>
                  <div className='min-w-[150px] px-[10px] border-[1px] border-gray-90 rounded-md flex justify-between items-center'>
                    <FaMinus className='' />
                    <p>2</p>
                    <FaPlus />
                  </div>
                  <button className='bg-primary px-[30px] py-[10px] rounded-md hover:bg-opacity-[90%] text-white'>Add To Cart</button>
                </div>
                <div className='border-[2px] border-gray-80 rounded-lg '>
                  <div className='m-[20px]'>
                    <div className='flex items-center gap-3'>

                    <img src={delivery} alt="delivery-icon" />
                    <p>Order</p>
                    </div>
                    <div className='flex items-center gap-3 bg-[#00FF38] rounded-lg w-[30%] px-[10px] py-[10px]'>
                      <img src={whatsapp} alt="" />
                      <p className='text-white'>Whatsapp</p>
                    </div>
                  </div>
                  <hr className='bg-gray-90 h-[2px]' />
                  <div className='m-[20px]'>
                    <img src={circle} alt="icon" />
                    <div>
                      <h1>Return Delivery</h1>
                      <p>Free 24 hours Delivery Returns. <span>Details</span></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      }
      <div className='my-[20px]'>
        <SubHeading title="Relate Items" />
        <ProductsList maxProducts={4} />
      </div>
    </div>
  )
}

export default Product
