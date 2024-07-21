import React from 'react'
import { categories } from '../constants/data'


const CategoriesList = () => {
  return (
    <div className='flex justify-between'>
        {
            categories.map((category, index) => (
                <div key={index} className='p-[20px] rounded-full border-[4px] border-primary flex flex-col items-center justify-center w-[150px] h-[150px] gap-2'>
                    <img src={category.icon} className='w-[65px]' alt="icon" />
                    <p className='text-[0.9em]'>{category.name}</p>
                </div>
            ))
        }
    </div>
  )
}

export default CategoriesList