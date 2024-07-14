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
        <Route path={"/tumenye"} element={<About />} />
        <Route path={"/tuvugishe"} element={<Contact />} />
        <Route path={"/ubufasha"} element={<Help />} />
        <Route path={"/igicuruzwa/:id"} element={<Product />} />
        <Route path={"/ibicuruzwa-byose"} element={<Products />} />
        <Route path={"/agatebo"} element={<Cart />} />
        <Route path={"/ibyo-wakunze"} element={<Likes />} />
        <Route path={"/tumiza/:id"} element={<Order />} />
        <Route path={"*"} element={<NotFound />} />
      </Routes>
      <Footer />
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick />
    </div>
  )
}

export default App
