import React from 'react'

const ProfileDropdown = () => {
  return (
    <div className='flex flex-col profileDropdown'>
        <ul className='flex flex-col gap-3 p-2'>
            {/* <li>Profile</li>
            <li>Settings</li> */}
            <li className='hover:border-gray-10 border p-1 class-border'>Logout</li>
        </ul>
    </div>
  )
}

export default ProfileDropdown