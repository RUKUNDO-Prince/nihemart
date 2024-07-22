import React from 'react'
import useAuthStore from '../store/authStore'

const ProfileDropdown = () => {
  const { logout, fetchUser } = useAuthStore();

  return (
    <div className='flex flex-col profileDropdown'>
        <ul className='flex flex-col gap-3 p-2'>
            <li>[username]</li>
            <li className='hover:border-gray-10 border p-1 class-border' onClick={() => logout()}>Logout</li>
        </ul>
    </div>
  )
}

export default ProfileDropdown