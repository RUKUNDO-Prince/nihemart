import React from "react";
import { arrivals } from "../constants/data";
import { woman, ps, speakers, perfume, img6, img4, amasaha, imiringa, siporo, electronic } from "../assets";

const ArrivalsGrid = () => {
  return (
    <div className="grid sm:grid-rows-2 sm:grid-cols-4 gap-5 w-[100%] my-[20px]">
      <div className="sm:col-span-2 sm:row-span-2 bg-blue3 bg-opacity-[50%] relative flex justify-center">
        {/* <img src={img6} className="" alt="img" /> */}
        <img src={amasaha} className="w-[50%] m-auto" alt="img" />
        <div className="absolute bottom-3 left-3 text-white">
          <h1 className="text-lg md:text-[1.5em] font-bold">Amasaha</h1>
          <p className="md:text-[1.2em]">
            Amasaha meza utasanga mu Rwanda ku biciro binogeye buri wese.
          </p>
        </div>
      </div>
      <div className="sm:col-span-2 row-span-1 bg-blue3 bg-opacity-[50%] relative flex justify-end">
        <img src={imiringa} className="md:w-[400px] md:h-[300px] w-[200px]" alt="img" />
        <div className="absolute bottom-3 left-3 text-white">
          <h1 className="text-lg md:text-[1.5em] font-bold">Imiringa</h1>
          <p className="md:text-[1.2em]">Gura imiringa myiza ku mafaranga make.</p>
        </div>
      </div>
      <div className="sm:col-span-1 row-span-1 bg-blue3 bg-opacity-[50%] relative flex justify-center p-[20px]">
        <img src={electronic} alt="img" />
        <div className="absolute bottom-3 left-3 text-white">
          <h1 className="text-lg md:text-[1.5em] font-bold">Ibikoresho bya electronic</h1>
          <p className="md:text-[1.2em]">Amazon wireless speakers</p>
        </div>
      </div>
      <div className="sm:col-span-1 row-span-1 bg-blue3 bg-opacity-[50%] relative flex justify-center p-[20px]">
        <img src={siporo} alt="img" />
        <div className="absolute bottom-3 left-3 text-white">
          <h1 className="text-lg md:text-[1.5em] font-bold">Ibikoresho bya siporo</h1>
          <p className="md:text-[1.2em]">GUCCI INTENSE OUD EDP</p>
        </div>
      </div>
    </div>
  );
};

export default ArrivalsGrid;
