import React, { useState } from "react";
import { OrderModal } from "../components";

const Order = () => {
    const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className=" px-5 md:px-10 py-5">
        <p className="text-gray-90 font-regular text-[14px] font-poppins">
          / Gaming / Order / <span className="text-black">Info</span>
        </p>
        <p className="text-primary font-poppins font-semibold text-[16px] my-[20px]">
          Fill the following 🖋️
        </p>
        <div className="grid gap-5 grid-cols-1 md:grid-cols-2">
          <form
            action=""
            className="bg-[#3B7EF8] bg-opacity-[5%] p-[20px] rounded-md"
          >
            <h1 className="font-bold text-[16px] font-lato mb-[20px]">
              Personal information
            </h1>
            <div className="flex flex-col gap-3">
              <label htmlFor="">Name</label>
              <input
                type="text"
                className="bg-[#D9D9D9] bg-opacity-[38%] outline-none w-full p-[10px] rounded-md"
              />
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor="">Email</label>
              <input
                type="text"
                className="bg-[#D9D9D9] bg-opacity-[38%] outline-none w-full p-[10px] rounded-md"
              />
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor="">Phone Number</label>
              <input
                type="text"
                className="bg-[#D9D9D9] bg-opacity-[38%] outline-none w-full p-[10px] rounded-md"
              />
            </div>
          </form>
          <form
            action=""
            className="bg-[#3B7EF8] bg-opacity-[5%] p-[20px] rounded-md"
          >
            <h1 className="font-bold font-lato text-[16px] mb-[20px]">
              Personal information
            </h1>
            <div className="flex flex-col gap-3">
              <label htmlFor="">City</label>
              <input
                type="text"
                className="bg-[#D9D9D9] bg-opacity-[38%] outline-none w-full p-[10px] rounded-md"
              />
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor="">Destination</label>
              <input
                type="text"
                className="bg-[#D9D9D9] bg-opacity-[38%] outline-none w-full p-[10px] rounded-md"
              />
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor="">Delivery Fee</label>
              <input
                type="text"
                className="bg-[#D9D9D9] bg-opacity-[38%] outline-none w-full p-[10px] rounded-md"
              />
            </div>
          </form>
        </div>
        <h1 className="text-primary font-bold font-poppins text-[24px] my-[20px] text-center md:text-start">
          🔔You pay after getting the product
        </h1>
        <div className="flex gap-3 justify-center md:justify-end">
          <button className="py-[10px] px-[50px] border-blue2 border-[1px] rounded-lg">
            Leave
          </button>
          <button className="py-[10px] px-[50px] bg-blue2 text-white rounded-lg hover:bg-blue3 transition-all duration-3000" onClick={() => setShowModal(true)}>
            Buy
          </button>
        </div>
      </div>
      <OrderModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
};

export default Order;
