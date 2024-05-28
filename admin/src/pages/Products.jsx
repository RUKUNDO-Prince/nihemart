import React from "react";
import SubHeading from "../components/SubHeading";
import { ProductsList } from "../components";
import { plus } from "../assets";

const Products = () => {
  return (
    <div className="m-[50px]">
      <div className="flex justify-between py-0">
        <SubHeading title="Recently added" />
        <button className="flex items-center px-8 rounded-lg outline-none text-primary m-8 float-end font-lato font-medium text-[20px] my-0 py-0 hover:opacity-[80%]">
          Add Product <img src={plus} className="pl-2" alt="" />
        </button>
      </div>
      <ProductsList maxProducts={4} />
      <button className="flex items-center bg-blue3 py-3 px-8 rounded-lg outline-none text-white my-0 float-end hover:bg-blue2">
        View More
      </button>
    </div>
  );
};

export default Products;
