import React from "react";
import { team } from "../constants/data";

const Team = () => {
  return (
    <div>
      {team.map((item, index) => (
        <div className="flex items-center gap-5 my-5">
          <img className="rounded-full border-[3px] border-primary w-[100px] h-[100px] p-[9px]" src={item.img} alt="" />
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
