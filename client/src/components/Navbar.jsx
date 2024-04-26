import React from 'react';
import { logo, cart, cartBg, likes } from '../assets';
import { NavLink } from 'react-router-dom';
import Search from './Search';
import Languages from './Languages';

const Navbar = () => {
  return (
    <div className='flex justify-between gap-3 items-center m-5 shadow-xl rounded-lg px-10'>
      <img src={logo} alt="logo" />
      <ul className='flex gap-10 font-poppins'>
        <NavLink exact to={"/"} activeClassName="active" className='hover:text-primary transition-colors'>Home</NavLink>
        <NavLink to={"/about"} activeClassName="active" className='hover:text-primary transition-colors'>About</NavLink>
        <NavLink to={"/contact"} activeClassName="active" className='hover:text-primary transition-colors'>Contact</NavLink>
        <NavLink to={"/help"} activeClassName="active" className='hover:text-primary transition-colors'>Help</NavLink>
      </ul>
      <Search />
      <Languages />
      <div className='flex gap-5'>
        <img src={likes} alt="likes" />
        <img src={cartBg} alt="cart" />
      </div>
    </div>
  );
}

export default Navbar;
