import React from 'react'

const SubHeading = ({ title }) => {
  return (
    <div className='flex gap-3 items-center justify-start'> 
        <div className='h-[20px] w-[7px] bg-primary'></div>
        <p className='text-primary'>{title}</p>
    </div>
  )
}

export default SubHeading