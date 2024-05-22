import React from "react";
import { Accordion } from "../components";
import { call, write } from "../assets";

const Contact = () => {
  return (
    <div className=" p-[25px] lg:p-[50px]">
      <p className="text-gray-90 mb-[20px]">
        Home / <span className="text-black">Contact</span>
      </p>
      <div className="flex flex-col md:flex-row justify-between gap-5">
        <div className="shadow-md content-center p-[40px] w-full md:w-[385px]">
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
        <div className="shadow-md md:w-[65%] py-[20px] px-[50px]">
          <form action="" className="relative w-full h-full">
            <div className="w-full flex flex-col h-full gap-5">
              <div className="flex flex-col lg:flex-row gap-5">
              <input type="text" className="bg-gray-90 bg-opacity-[30%] rrounded-md py-[15px] px-[20px] w-full" placeholder="Your Name" />
              <input type="email" className="bg-gray-90 bg-opacity-[30%] rrounded-md py-[15px] px-[20px] w-full" placeholder="Your Email" />
              <input type="number" className="bg-gray-90 bg-opacity-[30%] rrounded-md py-[15px] px-[20px] w-full" placeholder="Your Phone" />
              </div>
              <div className="flex flex-1">
              <textarea type="textbox" className="bg-gray-90 bg-opacity-[30%] col-span-3 row-span-4 rounded-md py-[10px] px-[20px] w-full" placeholder="Your Message"></textarea>
              </div>
            <button className="bg-blue3 hover:bg-opacity-[80%] py-[15px] px-[30px] rounded-lg text-white w-fit self-end">Send Message</button>
            </div>
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
