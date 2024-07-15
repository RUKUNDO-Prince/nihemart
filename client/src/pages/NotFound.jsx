import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className='m-[50px]'>
      <p className="text-gray-90 mb-[20px]">
        Ahabanza / <span className="text-black">Ntiyabonetse</span>
      </p>
      <div className='flex flex-col justify-center items-center'>
        <h1 className='font-inter font-medium text-[110px]'>404 Paje Ntayihari</h1>
        <p className='font-poppins font-regular text-[16px]'>Paje muri gushaka ntago yabashije kuboneka. Musubire ahabanza.</p>
        <Link to="/" className='bg-primary text-white mt-9 py-3 px-8 rounded-md hover:bg-opacity-[80%]'>Ahabanza</Link>
      </div>
    </div>
  )
}

export default NotFound
