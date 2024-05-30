import React from 'react'
import SubHeading from '../components/SubHeading'
import { likesData, notificationsData } from '../constants/data'
import { deleteIcon } from '../assets'

const Notifications = () => {
  return (
    <div className='m-[30px] flex-1'>
      <SubHeading title="Notifications" />
      <div className='my-5'>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 min-w-[1012px]">
        <thead className="text-[16px] text-black font-poppins drop-shadow-lg my-[20px]">
            <tr className="shadow-md">
                <th scope="col" className="px-6 py-8">
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
          {
            notificationsData.map((item, index) => (
              <tr key={index} className="bg-white border-b">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex gap-5 items-center">
                    <img src={item.img} className="w-[60px]" alt="img" /> <p className="text-[16px]">{item.name}</p>
                </th>
                <td className="px-6 py-4">
                    {item.price}
                </td>
                <td className="px-6 py-4">
                    {item.action}
                </td>
                <td className="px-6 py-4">
                    <img src={deleteIcon} alt="" />
                </td>
            </tr>
            ))
          }
            
        </tbody>
    </table>
      </div>
    </div>
  )
}

export default Notifications