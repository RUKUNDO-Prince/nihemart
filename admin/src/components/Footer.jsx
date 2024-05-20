import React from 'react';

const Footer = () => {
  return (
    <div className='flex justify-between px-8 py-4 bg-[#002B53] text-white absolute bottom-0 right-0 left-0'>
      <div>
        <ul className='flex'>
          <li className='footer-list-item'>Terms of service</li>
          <li className='footer-list-item'>User agreement</li>
          <li className='footer-list-item'>Privacy policy</li>
        </ul>
      </div>
      <div>
        <p>Copyright © Nihe Mart 2023. All rights reserved</p>
      </div>
    </div>
  );
};

export default Footer;
