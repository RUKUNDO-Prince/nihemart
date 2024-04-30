import React from 'react'
import { homeSlider } from '../constants/data'
import Carousel from './Carousel'

const Hero = () => {
  return (
    <div className='bg-gradient-to-r from-blueGradient to-orangeGradient w-[80%] p-[50px] h-[50vh] max-w-lg'>
      <Carousel>
        {homeSlider.map((item, index) => (
          <img src={item.image} alt='img' />
        ))}
      </Carousel>
    </div>
  )
}

export default Hero