import React from "react";
import SubHeading from "./SubHeading";
import Heading from "./Heading";
import ArrivalsGrid from "./ArrivalsGrid";
import { Link } from "react-router-dom";

const Arrivals = () => {
  return (
    <div className=" p-5 md:p-[50px]">
      <SubHeading title="Tangira ugure" />
      <div className="flex justify-between items-center">
        <Heading title="Top categories" />
        <Link to="/categories" className="bg-blue3 px-5 py-2 md:px-[30px] md:py-[10px] rounded-md text-white hover:bg-blue2">Reba category zose</Link>
      </div>
      <ArrivalsGrid />
    </div>
  );
};

export default Arrivals;
