import React from 'react'
import { categories } from '../constants/data'
import Dropdown from './Dropdown'

const Search = () => {
  return (
    <div className='flex items-center justify-center bg-gray-default rounded-lg border-gray-10 p-[20px]'>
      <form action="">
        <input type="text" name="searchQuery" id="searchQuery" placeholder='search' className='' />
      </form>
      <Dropdown data={categories} />
    </div>
  )
}

export default Search
