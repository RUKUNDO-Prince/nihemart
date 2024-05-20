import React from 'react';
import { categories } from '../constants/data';
import { FaAngleRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-[15%] hidden lg:flex  flex-col">
      <ul className="mb-[20px]">
        {categories.map((category, index) => (
          <li
            key={index}
            className="group flex items-center justify-between gap-5 py-2 hover:text-black"
          >
            {category.name}
            <FaAngleRight className="icon hidden group-hover:block" />
          </li>
        ))}
      </ul>
      <Link
        to="/products"
        className="bg-blue3  py-[10px] items-center rounded-md text-white hover:bg-blue2 text-nowrap"
      >
        <span className="flex items-center justify-center">View All</span>
      </Link>
    </div>
  );
};

export default Sidebar;
