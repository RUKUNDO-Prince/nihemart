import React from 'react'
import { ProductsList, SubHeading } from '../components'

const Products = () => {
  return (
    <div className='p-[50px]'>
      <SubHeading title="Our Products" />
      <ProductsList />
    </div>
  )
}

export default Products
