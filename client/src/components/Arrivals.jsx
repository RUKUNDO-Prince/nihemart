import React from 'react'
import SubHeading from './SubHeading'
import Heading from './Heading'
import ArrivalsGrid from './ArrivalsGrid'

const Arrivals = () => {
  return (
    <div className='p-[50px]'>
      <SubHeading title="Featured" />
        <Heading title="New Arrival" />
        <ArrivalsGrid />
    </div>
  )
}

export default Arrivals