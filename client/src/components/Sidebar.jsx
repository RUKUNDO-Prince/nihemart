import React, { useState } from "react";
import { categories } from "../constants/data";
import { FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(null);

  const handleMouseEnter = (index) => {
    setActiveCategoryIndex(index);
  };

  const handleMouseLeave = () => {
    setActiveCategoryIndex(null);
  };

  return (
    <div className="w-[15%] hidden lg:flex flex-col justify-between">
      <ul className="mb-[20px] relative">
        {categories.map((category, index) => (
          <div
            key={index}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            className="relative"
          >
            <Link to={category.link}>
              <li className="group flex items-center justify-between gap-5 py-[6.5px] hover:text-black">
                {category.name}
                <FaAngleRight className="icon hidden group-hover:block" />
              </li>
            </Link>

            {activeCategoryIndex === index && category.subcategories?.length > 0 && (
              <ul className="absolute left-full top-0 mt-[-6.5px] ml-2 p-2 bg-white shadow-lg border rounded-md z-10">
                {category.subcategories.map((subcategory, subIndex) => (
                  <li key={subIndex} className="py-1 px-2 hover:bg-gray-200">
                    <Link to={`${category.link}/${subcategory}`}>
                      {subcategory}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </ul>
      <Link
        to="/ibicuruzwa-byose"
        className="bg-blue3 py-[10px] items-center rounded-md text-white hover:bg-blue2 text-nowrap"
      >
        <span className="flex items-center justify-center">
          Reba ibicuruzwa byose
        </span>
      </Link>
    </div>
  );
};

export default Sidebar;
