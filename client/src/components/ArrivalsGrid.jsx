import React from "react";
import { arrivals } from "../constants/data";
import { woman, ps, speakers, perfume } from "../assets";

const ArrivalsGrid = () => {
  return (
    <div className="grid grid-rows-2 grid-cols-4 gap-5 h-[60vh] w-[100%] my-[20px]">
      <div className="col-span-2 row-span-2 bg-blue3 bg-opacity-[50%] relative flex justify-center p-[20px]">
        <img src={ps} alt="img" />
        <div className="absolute bottom-3 left-3 text-white">
          <h1 className="text-[1.5em] font-bold">PlayStation 5</h1>
          <p className="text-[1.2em]">
            Black and White version of the PS5 coming out on sale.
          </p>
        </div>
      </div>
      <div className="col-span-2 row-span-1 bg-blue3 bg-opacity-[50%] relative flex justify-end p-[20px]">
        <img src={woman} alt="img" />
        <div className="absolute bottom-3 left-3 text-white">
          <h1 className="text-[1.5em] font-bold">Women's Collection</h1>
          <p className="text-[1.2em]">Featured woman collections that give you another vibe.</p>
        </div>
      </div>
      <div className="col-span-1 row-span-1 bg-blue3 bg-opacity-[50%] relative flex justify-center p-[20px]">
        <img src={speakers} alt="img" />
        <div className="absolute bottom-3 left-3 text-white">
          <h1 className="text-[1.5em] font-bold">Speakers</h1>
          <p className="text-[1.2em]">Amazon wireless speakers</p>
        </div>
      </div>
      <div className="col-span-1 row-span-1 bg-blue3 bg-opacity-[50%] relative flex justify-center p-[20px]">
        <img src={perfume} alt="img" />
        <div className="absolute bottom-3 left-3 text-white">
          <h1 className="text-[1.5em] font-bold">Perfume</h1>
          <p className="text-[1.2em]">GUCCI INTENSE OUD EDP</p>
        </div>
      </div>
    </div>
  );
};

export default ArrivalsGrid;
