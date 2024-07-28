import React from "react";
import { Link } from "react-router-dom";

const CategoriesCard = ({ name, icon }) => {
  return (
    <div className="bg-blue3 bg-opacity-[80%] grid-col-1 flex justify-between items-center p-5 rounded-2xl">
      <div className=" min-h-full flex flex-col justify-between w-[50%]">
        <h1 className="text-white font-popins text-2xl font-bold text-wrap">
          {name}
        </h1>
        <Link
          to={`/categories/${name.toLowerCase()}`}
          className="text-black font-lato bg-white rounded-lg p-2 w-[55%] hover:bg-blue hover:text-white transition-all duration-400"
        >
          Tangira ugure
        </Link>
      </div>
      <img src={icon} alt="icon" className="w-[150px]" />
    </div>
  );
};

export default CategoriesCard;
