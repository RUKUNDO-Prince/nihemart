import React from "react";
import SubHeading from "./SubHeading";
import Heading from "./Heading";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import CategoriesList from "./CategoriesList";

const Categories = () => {
  return (
    <div className="p-[50px]">
      <SubHeading title="categories" />
      <div className="flex justify-between mb-[60px]">
        <Heading title="Browse By Category" />
        <div className="flex gap-3">
        <FaArrowLeft className="bg-gray-90 rounded-full p-[10px] w-[40px] h-[40px]" />
        <FaArrowRight className="bg-gray-90 rounded-full p-[10px] w-[40px] h-[40px]" />
        </div>
      </div>
      <CategoriesList />
    </div>
  );
};

export default Categories;
