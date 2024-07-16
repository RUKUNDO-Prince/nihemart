import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Navbar, Footer } from './components'
import { Home,  About, Contact, Help, Product, Products, NotFound, Cart, Likes, Order, Categories, OrderKigali } from './pages'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/tumenye"} element={<About />} />
        <Route path={"/tuvugishe"} element={<Contact />} />
        <Route path={"/ubufasha"} element={<Help />} />
        <Route path={"/igicuruzwa/:id"} element={<Product />} />
        <Route path={"/ibicuruzwa-byose"} element={<Products />} />
        <Route path={"/categories"} element={<Categories />} />
        <Route path={"/agatebo"} element={<Cart />} />
        <Route path={"/ibyo-wakunze"} element={<Likes />} />
        <Route path={"/tumiza/:id"} element={<Order />} />
        <Route path={"/tumiza/:id/kigali"} element={<OrderKigali />} />
        <Route path={"*"} element={<NotFound />} />
      </Routes>
      <Footer />
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick />
    </div>
  )
}

export default App
