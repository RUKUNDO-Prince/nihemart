import React from 'react'

const SubHeading = ({ title }) => {
  return (
    <div className='flex justify-between items-center w-[6%]'> 
        <div className='h-[20px] w-[7px] bg-primary'></div>
        <p className='text-primary'>{title}</p>
    </div>
  )
}

export default SubHeading