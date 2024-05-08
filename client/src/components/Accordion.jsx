import React, { useState } from "react";
import { faqs } from "../constants/data";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";

const Accordion = () => {
  const [accordionOpen, setAccordionOpen] = useState(new Array(faqs.length).fill(false));

  const toggleAccordion = (index) => {
    const newAccordionOpen = [...accordionOpen];
    newAccordionOpen[index] = !newAccordionOpen[index];
    setAccordionOpen(newAccordionOpen);
  };

  return (
    <div className="flex flex-col my-[20px]">
      {faqs.map((item, index) => (
        <div className="flex flex-col p-[30px] border-b-[5px] hover:shadow-2xl shadow-lg rounded-md items-center my-[10px]" key={index}>
          <button
            onClick={() => toggleAccordion(index)}
            className="flex justify-between w-full items-center"
          >
            <span className="font-poppins text-[18px]">{item.question}</span>
            <span>
              {accordionOpen[index] ? <FaAngleUp /> : <FaAngleDown />}
            </span>
          </button>
          <div className={`transition-all duration-300 ease-in-out w-full text-[18px] text-gray-50 mt-[20px] ${accordionOpen[index] ? "flex" : "hidden"}`}>
            <p>{item.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
