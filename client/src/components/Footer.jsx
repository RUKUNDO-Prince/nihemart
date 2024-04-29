import React from "react";
import Newsletter from "./Newsletter";
import { footerEndData, footerLinks, footerActions } from "../constants/data";
import { Link } from "react-router-dom";
import { FaInstagram, FaWhatsapp, FaTiktok } from "react-icons/fa";
import { logo } from "../assets";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-blue to-dark">
      <Newsletter />
      <div className="w-full h-[1.5px] bg-white"></div>
      {/* MAIN FOOTER */}
      <div>
        <div className=" h-[30vh] content-center">

        {/* FOOTER LINKS */}
        <div className="flex justify-around items-start gap-5 p-[10px]">
          <div className="w-[20%] flex">
          <img src={logo} alt="logo" />
          <div>
            <h1 className="text-white font-bold text-[1.2em]">Nihe Mart</h1>
            <p className="text-white">Buy Goods and order on our commercial website</p>
          </div>
          </div>
          {footerLinks.map((item, index) => (
            <div key={index} className="flex flex-col">
              <h1 className="text-white font-bold text-[1.2em]">{item.title}</h1>
              {item.links.map((link, index) => (
                <Link target="_blank" className="text-white hover:opacity-[80%] hover:underline transition-opacity" key={index} to={link.link}>{link.text}</Link>
              ))}
            </div>
          ))}
          {footerActions.map((item, index) => (
            <div className="flex flex-col" key={index}>
              <h1 className="text-white font-bold text-[1.2em]">{item.title}</h1>
              {item.links.map((link, index) => (
                <Link target="_blank" className="text-white hover:opacity-[80%] hover:underline transition-opacity" key={index} to={link.link}>{link.text}</Link>
              ))}
            </div>
          ))}
          <div>
            <h1 className="text-white font-bold mb-3 text-[1.2em]">Find Us Online</h1>
            <div className="flex gap-5">
              <Link target="_blank" to={"https://instagram.com"}><FaInstagram color="white" size={30} /></Link>
              <FaWhatsapp color="white" size={30} />
              <FaTiktok color="white" size={30} />
            </div>
          </div>
        </div>
          </div>
        <div className="w-[70%] m-auto h-[0.7px] bg-gray-70"></div>
        {/* FOOTER END */}
        <div className="flex justify-between items-center h-[15vh] w-[70%] m-auto">
          <p className="text-white">
            Copyright © 2024 Nihe Mart . All rights reserved
          </p>
          <p className="flex gap-5">
            {footerEndData.map((item, index) => (
              <span className="text-white" key={index}>
                {item}
              </span>
            ))}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
