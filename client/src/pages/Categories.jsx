import React from 'react'
import { categories } from '../constants/data'
import { CategoriesCard } from '../components'

const Categories = () => {
  return (
    <div className='flex-1'>
      <div className='grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-5 m-5'>
        {
          categories.map((item, index) => (
            <CategoriesCard name={item.name} icon={item.icon} key={index} />
          ))
        }
      </div>
    </div>
  )
}

export default Categories