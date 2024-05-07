import React from "react";
import { about } from "../assets";
import { Cta, Team } from "../components";

const About = () => {
  return (
    <div className="flex flex-col">
      <div className="bg-gradient-to-r from-blue2 to-deepBlue flex justify-around p-[20px]">
        <div className="content-center w-[30%]">
          <h1 className="text-white text-[60px] font-bold">About Us</h1>
          <p className="text-white text-[24px]">
            Explore a world of possibilities and join thousands of satisfied
            customers{" "}
          </p>
        </div>
        <img src={about} alt="img" />
      </div>
      <div className="flex items-start max-w-full justify-around p-[50px]">
        <div className="flex flex-col w-[50%]">
          <div>
            <h1 className="text-black font-bold text-[50px]">Who are we</h1>
            <p className="text-[16px] font-poppins">
              Launced in 2015, Exclusive is South Asia’s premier online shopping
              makterplace with an active presense in Bangladesh. Supported by
              wide range of tailored marketing, data and service solutions,
              Exclusive has 10,500 sallers and 300 brands and serves 3 millioons
              customers across the region. Exclusive has more than 1 Million
              products to offer, growing at a very fast. Exclusive offers a
              diverse assotment in categories ranging from consumer.
            </p>
          </div>
          <div>
            <h1 className="text-black font-bold text-[50px]">Our mission</h1>
            <p className="text-[16px] font-poppins">
              To satisfy our customers through the provision of our goods by
              delivering them to any location fast and secure
            </p>
          </div>
          <div>
            <h1 className="text-black font-bold text-[50px]">Delivery fee</h1>
            <ul>
              <li>Kigali: 1k</li>
              <li>Other provinces: 2k</li>
              <li>Other parts of kigali: 1.5k</li>
              <li>Free delivery on 3 products</li>
            </ul>
          </div>
        </div>
        <div>
          <h1 className="text-black font-bold text-[50px]">Meet Our Team</h1>
          <Team />
        </div>
      </div>
      <Cta />
    </div>
  );
};

export default About;
