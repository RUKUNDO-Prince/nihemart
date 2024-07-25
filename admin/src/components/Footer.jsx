import React from 'react';

const Footer = () => {
  return (
    <div className='flex justify-between px-8 py-4 bg-[#002B53] text-white'>
      <div>
        <ul className='flex flex-col list-disc md:flex-row md:list-none'>
          <li className='text-[12px] sm:text-[13px] md:text-[14px] lg:text-[16px] footer-list-item'>
            Terms of service
          </li>
          <li className='text-[12px] sm:text-[13px] md:text-[14px] lg:text-[16px] footer-list-item'>
            User agreement
          </li>
          <li className='text-[12px] sm:text-[13px] md:text-[14px] lg:text-[16px] footer-list-item'>
            Privacy policy
          </li>
        </ul>
      </div>
      <div>
        <p className='text-[14px] md:text-[16px]'>Copyright © Nihe Mart 2023. All rights reserved</p>
      </div>
    </div>
  );
};

export default Footer;
