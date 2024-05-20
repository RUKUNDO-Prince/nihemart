import React from 'react'

const Heading = ({ title }) => {
  return (
    <h1 className='font-inter font-bold text-black text-[18px] xs:text-[24px] md:text-[2.5em]'>{title}</h1>
  )
}

export default Heading