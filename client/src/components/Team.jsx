import React from "react";
import { team } from "../constants/data";

const Team = () => {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-1 gap-5">
      {team.map((item, index) => (
        <div className="flex items-center gap-5 my-5" key={index}>
          <div className="rounded-full border-[3px] border-primary w-[64px] h-[64px] p-[9px] overflow-hidden">
          <img className="object-contain w-[64px] h-[64px]" src={item.img} alt="" />
          </div>
          <div>
            <p className="font-inter text-[15px]">{item.name}</p>
            <p className="text-primary text-[14px]">{item.position}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Team;
