import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Navbar, Footer } from './components'
import { Home,  About, Contact, Help, Product, Products, NotFound } from './pages'

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/about"} element={<About />} />
        <Route path={"/contact"} element={<Contact />} />
        <Route path={"/help"} element={<Help />} />
        <Route path={"/product/:id"} element={<Product />} />
        <Route path={"/products"} element={<Products />} />
        <Route path={"*"} element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
