import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuthStore from '../store/authStore';

const NotFound = () => {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const handleAuth = () => {
    if (!isAuthenticated) {
      navigate("/signup");
    }
  };
  useEffect(() => {
    handleAuth();
  }, [navigate, isAuthenticated]);
  return (
    <div className='m-[30px] flex-1'>
      <p className="text-gray-90 mb-[20px]">
        Home / <span className="text-black">NotFound</span>
      </p>
      <div className='flex flex-col justify-center items-center'>
        <h1 className='font-inter font-medium text-[110px]'>404 Not Found</h1>
        <p className='font-poppins font-regular text-[16px]'>Your requested page not found. You may go home page.</p>
        <Link to="/" className='bg-primary text-white mt-9 py-3 px-8 rounded-md hover:bg-opacity-[80%]'>Back to Homepage</Link>
      </div>
    </div>
  )
}

export default NotFound
