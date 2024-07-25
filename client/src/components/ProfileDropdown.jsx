import React, { useEffect } from 'react';
import useAuthStore from '../store/authStore';

const ProfileDropdown = () => {
  const { user, isAuthenticated, logout, fetchUser } = useAuthStore();

  useEffect(() => {
    if (!user && isAuthenticated) {
      fetchUser(); // Fetch user data if not already available
    }
  }, [user, isAuthenticated, fetchUser]);

  return (
    <div className='flex flex-col profileDropdown'>
      <ul className='flex flex-col gap-3 p-2'>
        <li>{isAuthenticated ? user?.name || "Fetching..." : "Not logged in"}</li>
        <li 
          className='hover:border-gray-10 border p-1 class-border' 
          onClick={logout}
        >
          Logout
        </li>
      </ul>
    </div>
  );
}

export default ProfileDropdown;
