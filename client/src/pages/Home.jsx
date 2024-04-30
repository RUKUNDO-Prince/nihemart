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
      <Products />
      <Arrivals />
      <Cta />
    </div>
  )
}

export default Home
