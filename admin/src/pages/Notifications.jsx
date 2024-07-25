import React, { useEffect } from 'react';
import SubHeading from '../components/SubHeading';
import { notificationsData } from '../constants/data';
import { deleteIcon } from '../assets';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const Notifications = () => {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const handleAuth = () => {
    if (!isAuthenticated) {
      navigate("/signup");
    }
  };

  useEffect(() => {
    handleAuth();
  }, [navigate, isAuthenticated]);

  return (
    <div className='m-[30px] flex-1'>
      <SubHeading title="Notifications" />
      <div className='my-5 overflow-x-auto'>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 min-w-[600px] md:min-w-[1012px]">
          <thead className="text-[16px] text-black font-poppins drop-shadow-lg my-[20px]">
            <tr className="shadow-md">
              <th scope="col" className="px-6 py-3">
                Product
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3 text-primary">
                Action
              </th>
              <th scope="col" className="px-6 py-3">
                
              </th>
            </tr>
          </thead>
          <tbody>
            {notificationsData.map((item, index) => (
              <tr key={index} className="bg-white border-b">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex gap-5 items-center">
                  <img src={item.img} className="w-[60px]" alt="img" /> 
                  <p className="text-[16px]">{item.name}</p>
                </th>
                <td className="px-6 py-4">
                  {item.price}
                </td>
                <td className="px-6 py-4">
                  {item.action}
                </td>
                <td className="px-6 py-4">
                  <img src={deleteIcon} alt="delete" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Notifications;
