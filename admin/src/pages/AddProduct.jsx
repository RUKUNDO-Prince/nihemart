import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const AddProduct = () => {
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
    <div>AddProduct</div>
  )
}

export default AddProduct