import React from 'react';
import { categories } from '../constants/data';
import { FaAngleRight } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className='w-[15%]'>
      <ul>
        {categories.map((category, index) => (
          <li key={index} className="group flex items-center justify-between gap-5 py-2 hover:text-black">
            {category.name}
            <FaAngleRight className="icon hidden group-hover:block" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
