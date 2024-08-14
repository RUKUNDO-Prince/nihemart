import React from "react";
import Newsletter from "./Newsletter";
import { footerLinks, footerActions } from "../constants/data";
import { Link } from "react-router-dom";
import { FaInstagram, FaWhatsapp, FaTiktok } from "react-icons/fa";
import { logo } from "../assets";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gradient-to-b from-blue to-dark">
      {/* <Newsletter /> */}
      <div className="w-full h-[1.5px] bg-white"></div>
      {/* MAIN FOOTER */}
      <div>
        <div>
          {/* FOOTER LINKS */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-5 lg:w-[80%] mx-auto font-poppins">
            <div className="flex">
              <div>
                <h1 className="text-white font-bold text-[1.2em]">Nihe Mart</h1>
                <p className="text-white">
                  {t('first')}
                </p>
              </div>
            </div>
            {footerLinks.map((item, index) => (
              <div key={index} className="flex flex-col">
                <h1 className="text-white font-bold ">{item.title}</h1>
                {item.links.map((link, index) => (
                  <Link
                    target="_blank"
                    className="text-white hover:opacity-[80%] hover:underline transition-opacity"
                    key={index}
                    to={link.link}
                  >
                    {link.text}
                  </Link>
                ))}
              </div>
            ))}
            {footerActions.map((item, index) => (
              <div className="flex flex-col font-poppins" key={index}>
                <h1 className="text-white font-bold">{item.title}</h1>
                {item.links.map((link, index) => (
                  <Link
                    target="_blank"
                    className="text-white hover:opacity-[80%] hover:underline transition-opacity"
                    key={index}
                    to={link.link}
                  >
                    {link.text}
                  </Link>
                ))}
              </div>
            ))}
            <div>
              <h1 className="text-white font-bold mb-3">
                {t('social')}
              </h1>
              <div className="flex gap-5">
                <Link
                  target="_blank"
                  to={"https://www.instagram.com/nihe_mart/"}
                >
                  <FaInstagram color="white" size={30} />
                </Link>
                <Link target="_blank" to={"https://wa.me/250792412177"}>
                  <FaWhatsapp color="white" size={30} />
                </Link>
                <Link target="_blank" to={"https://www.tiktok.com/@nihe_mart"}>
                  <FaTiktok color="white" size={30} />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[80%] m-auto h-[0.7px] bg-gray-70"></div>
        {/* FOOTER END */}
        <div className="flex py-7 lg:w-[80%] mx-auto text-xs flex-wrap gap-3 flex-col md:flex-row justify-between">
          <p className="text-white text-sm font-light text-nowrap text-center md:text-start">
            Copyright © 2024 Nihe Mart . All rights reserved
          </p>
          <div className="flex md:gap-3 items-center justify-between md:justify-evenly flex-col xs:flex-row gap-3 xs:gap-0 text-sm">
            <Link
              to={"#"}
              className="text-white font-semibold text-nowrap xs:border-r-2 border-r-white pr-5 text-center md:text-start hover:underline"
            >
              Privacy Policy
            </Link>
            <Link
              to={"#"}
              className="text-white font-semibold text-nowrap xs:border-r-2 border-r-white pr-5 text-center md:text-start hover:underline"
            >
              Terms and Conditions
            </Link>
            <Link
              to={"#"}
              className="text-white font-semibold text-nowrap xs:border-r-2 border-r-white pr-5 text-center md:text-start hover:underline"
            >
              User Agreement
            </Link>
            <Link
              to={"#"}
              className="text-white font-semibold text-nowrap text-center md:text-start hover:underline"
            >
              License
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
