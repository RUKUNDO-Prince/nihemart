import React from 'react'
import { logo } from '../assets'
import { Link } from 'react-router-dom'
import { TbDeviceAnalytics } from "react-icons/tb";

const Navbar = () => {
  return (
    <div>
      <img src={logo} alt="logo" />
      <div>
        <ul>
          <Link to="/"><TbDeviceAnalytics />Analytics</Link>
          <Link to="/products">Products</Link>
          <Link to="/orders">Orders</Link>
        </ul>
      </div>
      <div>

      </div>
    </div>
  )
}

export default Navbar