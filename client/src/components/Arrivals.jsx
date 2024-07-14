import React from 'react'
import SubHeading from './SubHeading'
import Heading from './Heading'
import ArrivalsGrid from './ArrivalsGrid'

const Arrivals = () => {
  return (
    <div className=' p-5 md:p-[50px]'>
      <SubHeading title="Bigishyushye" />
        <Heading title="Ibisohotse Vuba" />
        <ArrivalsGrid />
    </div>
  )
}

export default Arrivals