import React from 'react';
import { logo, cart, cartBg, likes } from '../assets';
import { Link, NavLink } from 'react-router-dom';
import Search from './Search';
import Languages from './Languages';

const Navbar = () => {
  return (
    <div className='flex justify-between gap-3 items-center m-5 shadow-xl rounded-lg px-10'>
      <Link to="/"><img src={logo} alt="logo" /></Link>
      <ul className='flex gap-10 font-poppins'>
        <NavLink exact to={"/"} activeclassname="active" className='hover:text-primary transition-colors'>Home</NavLink>
        <NavLink to={"/about"} activeclassname="active" className='hover:text-primary transition-colors'>About</NavLink>
        <NavLink to={"/contact"} activeclassname="active" className='hover:text-primary transition-colors'>Contact</NavLink>
        <NavLink to={"/help"} activeclassname="active" className='hover:text-primary transition-colors'>Help</NavLink>
      </ul>
      <Search />
      <Languages />
      <div className='flex gap-5 items-center'>
        <Link to="/likes"><img src={likes} alt="likes" /></Link>
        <Link to="/cart"><img src={cartBg} alt="cart" /></Link>
      </div>
    </div>
  );
}

export default Navbar;
