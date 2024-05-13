import React from 'react'

const Order = () => {
  return (
    <div className='m-[50px]'>
        <p className='text-gray-90 font-regular text-[14px] font-poppins'>/ Gaming / Order / <span className='text-black'>Info</span></p>
        <p className='text-primary font-poppins font-semibold text-[16px] my-[20px]'>Fill the following 🖋️</p>
        <div className='flex gap-5'>
            <form action="" className='bg-[#3B7EF8] bg-opacity-[5%] p-[20px] w-[48%] rounded-md'>
                <h1 className='font-bold text-[16px] font-lato mb-[20px]'>Personal information</h1>
                <div className='flex flex-col gap-3'>
                    <label htmlFor="">Name</label>
                    <input type="text" className='bg-[#D9D9D9] bg-opacity-[38%] outline-none w-full p-[10px] rounded-md' />
                </div>
                <div className='flex flex-col gap-3'>
                    <label htmlFor="">Email</label>
                    <input type="text" className='bg-[#D9D9D9] bg-opacity-[38%] outline-none w-full p-[10px] rounded-md' />
                </div>
                <div className='flex flex-col gap-3'>
                    <label htmlFor="">Phone Number</label>
                    <input type="text" className='bg-[#D9D9D9] bg-opacity-[38%] outline-none w-full p-[10px] rounded-md' />
                </div>
            </form>
            <form action="" className='bg-[#3B7EF8] bg-opacity-[5%] p-[20px] w-[48%] rounded-md'>
                <h1 className='font-bold font-lato text-[16px] mb-[20px]'>Personal information</h1>
                <div className='flex flex-col gap-3'>
                    <label htmlFor="">Name</label>
                    <input type="text" className='bg-[#D9D9D9] bg-opacity-[38%] outline-none w-full p-[10px] rounded-md' />
                </div>
                <div className='flex flex-col gap-3'>
                    <label htmlFor="">Email</label>
                    <input type="text" className='bg-[#D9D9D9] bg-opacity-[38%] outline-none w-full p-[10px] rounded-md' />
                </div>
                <div className='flex flex-col gap-3'>
                    <label htmlFor="">Phone Number</label>
                    <input type="text" className='bg-[#D9D9D9] bg-opacity-[38%] outline-none w-full p-[10px] rounded-md' />
                </div>
            </form>
        </div>
        <h1 className='text-primary font-bold font-poppins text-[24px] my-[20px]'>🔔You pay after getting the product</h1>
        <div className='flex gap-3 justify-end'>
            <button className='py-[10px] px-[50px] border-blue2 border-[1px] rounded-lg'>Leave</button>
            <button className='py-[10px] px-[50px] bg-blue2 text-white rounded-lg hover:bg-blue3 transition-all duration-3000'>Buy</button>
        </div>
    </div>
  )
}

export default Order