import React from "react";
import SubHeading from "./SubHeading";
import Heading from "./Heading";
import { Link } from "react-router-dom";
import ProductsList from "./ProductsList";

const Products = () => {
  return (
    <div className=" p-5 md:p-[50px]">
      <SubHeading title="Our Products" />
      <div className="flex justify-between items-center">
        <Heading title="Best of this month" />
        <Link to="/products" className="bg-blue3 px-5 py-2 md:px-[30px] md:py-[10px] rounded-md text-white hover:bg-blue2">View All</Link>
      </div>
      <ProductsList maxProducts={8}/>
    </div>
  );
};

export default Products;
