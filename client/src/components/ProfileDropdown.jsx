import React, { useEffect, useState } from "react";
import useAuthStore from "../store/authStore";
import AuthModal from "./AuthModal";
import { useTranslation } from "react-i18next";

const ProfileDropdown = () => {
  const { user, isAuthenticated, logout } = useAuthStore();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const { t } = useTranslation();

  const handleClose = (e) => {
    if (e.target.id === "modal") setIsLoginModalOpen(false);
  };
  

  return (
    <>
      <div className="flex flex-col profileDropdown">
        <ul className="flex flex-col gap-3 p-2">
          {isAuthenticated ? (
            <div>
              <h2>{user?.name}</h2>
            </div>
          ) : (
            <div>
              <button onClick={() => setIsLoginModalOpen(true)}>Log in</button>
            </div>
          )}
          {isAuthenticated && (
            <button
              className="hover:border-gray-10 border p-1 class-border"
              onClick={logout}
            >
              {t('logout')}
            </button>
          )}
        </ul>
      </div>
      <AuthModal
        isLoginModalOpen={isLoginModalOpen}
        handleClose={handleClose}
      />
    </>
  );
};

export default ProfileDropdown;
