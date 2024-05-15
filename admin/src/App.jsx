import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { AddProduct, Analytics, Login, NotFound, Notifications, Orders, Product, Products, Profile, Signup } from './pages'
import { Footer, Navbar } from './components'

const App = () => {
  return (
    <>
      <Routes>
        <Route path={"/login"} element={<Login />} />
        <Route path={"/signup"} element={<Signup />} />
      </Routes>
        <>
          <Navbar />
          <Routes>
            <Route path={"/"} element={<Analytics />} />
            <Route path={"/addProduct"} element={<AddProduct />} />
            <Route path={"/notifications"} element={<Notifications />} />
            <Route path={"/orders"} element={<Orders />} />
            <Route path={"/products"} element={<Products />} />
            <Route path={"/profile"} element={<Profile />} />
            <Route path={"/product/:id"} element={<Product />} />
            <Route path={"*"} element={<NotFound />} />
          </Routes>
          <Footer />
        </>
    </>
  )
}

export default App