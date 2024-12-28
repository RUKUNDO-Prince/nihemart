import React from 'react';
import useAuthStore from '../store/authStore';

const Header = () => {
  const { user } = useAuthStore();

  return (
    <header>
      <h1>Welcome, {user ? user.name : 'Guest'}</h1>
      {/* Other header elements */}
    </header>
  );
};

export default Header; 