import React from "react";
import { Accordion } from "../components";
import { call, write } from "../assets";

const Contact = () => {
  return (
    <div className="m-[50px]">
      <p className="text-gray-90 mb-[20px]">
        Home / <span className="text-black">Contact</span>
      </p>
      <div className="flex justify-between">
        <div className="shadow-md content-center p-[40px] w-[30%]">
          <div className="flex items-center gap-5 my-[30px]">
            <img className="" src={call} alt="img" />
            <h1 className="font-medium font-poppins text-[16px]">Call To Us</h1>
          </div>
          <p className="font-poppins text-[15px] my-5">We are available 24/7, 7 days a week.</p>
          <p className="font-poppins text-[15px] my-5">Phone: +8801611112222</p>
          <hr className="h-[2px] bg-gray-90" />
          <div className="flex items-center gap-5 my-[30px]">
            <img className="" src={write} alt="img" />
            <h1 className="font-medium font-poppins text-[16px]">Write To Us</h1>
          </div>
          <p className="font-poppins text-[15px] my-5">Fill out our form and we will contact you within 24 hours.</p>
          <p className="font-poppins text-[15px] my-5">Emails: customer@Nihe Mart.com</p>
        </div>
        <div className="shadow-md w-[65%] py-[20px] px-[50px]">
          <form action="" className="relative">
            <div className="grid grid-rows-6 grid-cols-3 gap-[20px] min-h-full my-0">
              <input type="text" className="bg-gray-90 bg-opacity-[30%] col-span-1 row-span-1 rounded-md py-[15px] px-[20px]" placeholder="Your Name" />
              <input type="email" className="bg-gray-90 bg-opacity-[30%] col-span-1 row-span-1 rounded-md py-[15px] px-[20px]" placeholder="Your Email" />
              <input type="number" className="bg-gray-90 bg-opacity-[30%] col-span-1 row-span-1 rounded-md py-[15px] px-[20px]" placeholder="Your Phone" />
              <textarea type="textbox" className="bg-gray-90 bg-opacity-[30%] col-span-3 row-span-4 rounded-md py-[10px] px-[20px]" placeholder="Your Message"></textarea>
            </div>
            <button className="bg-blue3 hover:bg-opacity-[80%] py-[15px] px-[30px] rounded-lg text-white absolute right-0 bottom-0">Send Message</button>
          </form>
        </div>
      </div>
      <div>
        <Accordion />
      </div>
    </div>
  );
};

export default Contact;
