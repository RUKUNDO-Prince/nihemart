import React from 'react'
import { logo, cart, cartBg, likes } from '../assets'
import { Link } from 'react-router-dom'
import Search from './Search'
import Languages from './Languages'

const Navbar = () => {
  return (
    <div className='flex justify-between gap-3 items-center m-5 shadow-xl rounded-lg px-10'>
      <img src={logo} alt="logo" />
      <ul className='flex gap-10 font-poppins'>
        <Link to={"/"}>Home</Link>
        <Link to={"/about"}>About</Link>
        <Link to={"/contact"}>Contact</Link>
        <Link to={"/help"}>Help</Link>
      </ul>
      <Search />
      <Languages />
      <div className='flex gap-5'>
        <img src={likes} alt="likes" />
        <img src={cartBg} alt="cart" />
      </div>
    </div>
  )
}

export default Navbar
