import React, { useRef } from "react";
import { Accordion } from "../components";
import { call, write } from "../assets";
import emailjs from '@emailjs/browser'
import toast, { Toaster } from 'react-hot-toast'
import { useTranslation } from "react-i18next";

const Contact = () => {
  const{ t } = useTranslation();

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_capv1j7', 'template_j1onpcc', form.current, {
        publicKey: '0DBwIQTENB0XFN8iq',
      })
      .then(
        () => {
          toast.success("Message sent successfully, wait for the reply!");
          console.log('SUCCESS!');
        },
        (error) => {
          toast.error("Message failed to send, try again later!");
          console.log('FAILED...', error.text);
        },
      );
  };

  return (
    <div className=" p-[25px] lg:p-[50px]">
      <Toaster position="top-center" reverseOrder={false} />
      <p className="text-gray-90 mb-[20px]">
        {t('home')} / <span className="text-black">{t('contact')}</span>
      </p>
      <div className="flex flex-col md:flex-row justify-between gap-5">
        <div className="shadow-md content-center p-[40px] w-full md:w-[385px]">
          <div className="flex items-center gap-5 my-[30px]">
            <img className="" src={call} alt="img" />
            <h1 className="font-medium font-poppins text-[16px]">{t('call')}</h1>
          </div>
          <p className="font-poppins text-[15px] my-5">{t('line')}</p>
          <p className="font-poppins text-[15px] my-5">Phone: +250792412177</p>
          <hr className="h-[2px] bg-gray-90" />
          <div className="flex items-center gap-5 my-[30px]">
            <img className="" src={write} alt="img" />
            <h1 className="font-medium font-poppins text-[16px]">{t('write')}</h1>
          </div>
          <p className="font-poppins text-[15px] my-5">{t('form')}</p>
          <p className="font-poppins text-[15px] my-5">Email: customer@nihemart.com</p>
        </div>
        <div className="shadow-md md:w-[65%] py-[20px] px-[50px]">
          <form action="" ref={form} onSubmit={sendEmail} className="relative w-full h-full">
            <div className="w-full flex flex-col h-full gap-5">
              <div className="flex flex-col lg:flex-row gap-5">
              <input type="text" name="name" className="bg-gray-90 bg-opacity-[30%] rrounded-md py-[15px] px-[20px] w-full" placeholder={t('names')} />
              <input type="email" name="email" className="bg-gray-90 bg-opacity-[30%] rrounded-md py-[15px] px-[20px] w-full" placeholder={t('email')} />
              <input type="number" name="telephone" className="bg-gray-90 bg-opacity-[30%] rrounded-md py-[15px] px-[20px] w-full" placeholder={t('telephone')} />
              </div>
              <div className="flex flex-1">
              <textarea type="textbox" name="message" className="bg-gray-90 bg-opacity-[30%] col-span-3 row-span-4 rounded-md py-[10px] px-[20px] w-full" placeholder={t('message')}></textarea>
              </div>
              
            <button className="bg-blue3 hover:bg-opacity-[80%] py-[15px] px-[30px] rounded-lg text-white w-fit self-end">{t('send')}</button>
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
