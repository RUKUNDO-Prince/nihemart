import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Navbar, Footer } from './components'
import { Home,  About, Contact, Help, Product, Products, NotFound, Cart, Likes, Order } from './pages'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/about"} element={<About />} />
        <Route path={"/contact"} element={<Contact />} />
        <Route path={"/help"} element={<Help />} />
        <Route path={"/product/:id"} element={<Product />} />
        <Route path={"/products"} element={<Products />} />
        <Route path={"/cart"} element={<Cart />} />
        <Route path={"/likes"} element={<Likes />} />
        <Route path={"/order"} element={<Order />} />
        <Route path={"*"} element={<NotFound />} />
      </Routes>
      <Footer />
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick />
    </div>
  )
}

export default App
