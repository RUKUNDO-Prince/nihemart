import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AddProduct, Analytics, Login, NotFound, Notifications, Orders, Product, Products, Profile, Signup } from './pages';
import { Footer, Navbar } from './components';
import './App.css'

const App = () => {
  const location = useLocation();

  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <div className='flex flex-col min-h-screen'>
      {!isAuthPage && <Navbar />}
      <Routes>
        <Route path={"/login"} element={<Login />} />
        <Route path={"/signup"} element={<Signup />} />
      </Routes>
      {!isAuthPage && (
        <>
          <Routes>
            
            <Route path={"/"} element={<Analytics />} />
            <Route path={"/addProduct"} element={<AddProduct />} />
            <Route path={"/notifications"} element={<Notifications />} />
            <Route path={"/orders"} element={<Orders />} />
            <Route path={"/products"} element={<Products />} />
            {/* <Route path={"/profile"} element={<Profile />} /> */}
            <Route path={"/product"} element={<Product />} />
            <Route path={"*"} element={<NotFound />} />
          </Routes>
          <Footer />
        </>
      )}
    </div>
  );
};

export default App;
