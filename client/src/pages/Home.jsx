import React from 'react'
import { Hero, Sidebar, Categories, Products, Arrivals, Cta } from '../components'

const Home = () => {
  return (
    <div>
      <div className='flex items-center justify-between mx-[50px]'>
      <Sidebar />
      <Hero />
      </div>
      <Categories />
      <div className='w-[95%] h-[2px] bg-gray-90 m-auto'></div>
      <Products />
      <Arrivals />
      <Cta />
    </div>
  )
}

export default Home
