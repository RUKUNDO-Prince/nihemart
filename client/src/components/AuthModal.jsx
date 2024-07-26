import React from "react";
import useAuthStore from "../store/authStore";
import AuthForm from "./AuthForm";

const AuthModal = ({ isLoginModalOpen, handleClose }) => {
  const { isAuthenticated } = useAuthStore();
  return (
    <>
      <div
        id="modal"
        onClick={handleClose}
        className={` ${
          !isAuthenticated && isLoginModalOpen ? "block" : "hidden"
        } fixed inset-0 bg-black bg-opacity-10 z-50 flex items-center justify-center backdrop-blur-[2px] transition-all delay-100  duration-200`}
      ></div>
      {/* login and sign up */}
      <div
        className={` ${
          !isAuthenticated && isLoginModalOpen
            ? "scale-100 origin-center transition-all duration-200"
            : "scale-0"
        } fixed w-[90%] md:w-2/3 lg:w-1/2 z-50 mx-auto top-16 left-[5%] md:left-[20%] lg:left-[25%] flex justify-center`}
      >
        <AuthForm />
      </div>
    </>
  );
};

export default AuthModal;
