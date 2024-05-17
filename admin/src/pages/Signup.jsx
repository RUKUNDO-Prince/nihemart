import React from "react";
import { figure, logo } from "../assets";
import { AiOutlineSwapRight } from "react-icons/ai";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="flex min-h-[100vh]">
      <div className="bg-primary w-[40%]">
        <img src={figure} className="w-[75%]" alt="" />
      </div>
      <div className="flex items-center justify-center w-[50%] m-auto">
        <div className="flex flex-col shadow-lg p-[50px] w-[70%] m-[20px]">
          <div className="flex items-center mb-[20px]">
            <img src={logo} alt="logo" />
            <p className="text-primary font-poppins font-semibold text-[26px]">
              Nihe <span className="text-blue2">Mart</span>
            </p>
          </div>

          <h1 className="font-lato font-regular text-[40px] my-[5px]">Sign Up</h1>
          <p className="font-lato font-regular text-[16px] text-[#224957] my-[5px]">
            Create your account !
          </p>
          <div>
            <form className="flex flex-col gap-5" action="">
              <div className="flex flex-col gap-3">
                <label htmlFor="" className="font-light text-[14px] font-lato">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="bg-[#FFF6F4] text-black outline-none p-[10px] rounded-lg"
                />
              </div>
              <div className="flex flex-col gap-3">
                <label htmlFor="" className="font-light text-[14px] font-lato">
                  Email or Phone Number
                </label>
                <input
                  type="text"
                  placeholder="doe@gmail.com"
                  className="bg-[#FFF6F4] text-black outline-none p-[10px] rounded-lg"
                />
              </div>
              <div className="flex flex-col gap-3">
                <label htmlFor="" className="font-light text-[14px] font-lato">
                  Password
                </label>
                <input
                  type="text"
                  placeholder="*******"
                  className="bg-[#FFF6F4] text-black outline-none p-[10px] rounded-lg"
                />
              </div>
              <button className="bg-blue2 flex items-center justify-center hover:bg-blue3 mb-[10px] text-white gap-5 p-2.5 rounded-xl w-full m-auto">
                Sign Up <AiOutlineSwapRight />
              </button>
            </form>
            <p className="text-[#224957]">
              Already have an account? <Link to="/login" className="text-blue2 hover:underline">Log in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
