import React from "react";
import {
  anonymous,
  draft,
  main,
  other1,
  other2,
  other3,
  plusBg,
  tick,
} from "../assets";

const Product = () => {
  return (
    <div className="flex-1 m-[30px] flex-col">
      <div>
        <div className="flex justify-between">
          <p className="font-poppins font-semibold text-[16px] text-primary flex items-center gap-3">
            <img src={anonymous} alt="icon" /> Add New Product
          </p>
          <div className="flex gap-5">
            <button className="border-2 border-gray-90 text-black p-4 rounded-lg flex items-center hover:bg-gray-90 gap-3 h-12">
              <img src={draft} alt="draft" />
              Save Draft
            </button>
            <button className="bg-blue2 text-white px-5 h-12 rounded-lg flex items-center hover:bg-blue3 gap-3">
              <img src={tick} alt="tick" />
              Add Product
            </button>
          </div>
        </div>
        <div>
          <div className="flex justify-between gap-5 my-4">
            <div className="bg-gray-90 bg-opacity-[20%] w-[60%] p-5 rounded-lg">
              <h1 className="font-lato font-bold text-[20px]">
                General Information
              </h1>
              <form action="">
                <div className="flex flex-col">
                  <label
                    htmlFor=""
                    className="font-lato font-medium text-[15px]"
                  >
                    Product Name
                  </label>
                  <input
                    className="font-poppins font-medium text-[15px] bg-gray-90 bg-opacity-[40%] p-2 h-10 rounded-md outline-none"
                    type="text"
                    placeholder="Havic HV G-92 Gamepad"
                  />
                </div>
                <div className="flex flex-col ">
                  <label
                    htmlFor=""
                    className="font-lato font-medium text-[15px]"
                  >
                    Product Description
                  </label>
                  <textarea
                    type="text"
                    className="font-poppins font-medium text-[15px] p-2 bg-gray-90 bg-opacity-[40%] h-[250px] outline-none rounded-lg"
                    placeholder="PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble free install & mess free removal Pressure sensitive."
                  ></textarea>
                </div>
              </form>
              <div className="flex justify-between my-5 items-start">
                <div className="w-[40%]">
                  <h1 className="font-semibold text-[20px]">Size</h1>
                  <p className="text-gray-50">Pick available sizes</p>
                  <ul className="flex gap-3">
                    <li className="w-[40px] h-[40px] flex justify-center items-center hover:bg-opacity-[70%] bg-gray-90 rounded-lg">
                      XS
                    </li>
                    <li className="w-[40px] h-[40px] flex justify-center items-center hover:bg-opacity-[70%] bg-gray-90 rounded-lg">
                      M
                    </li>
                    <li className="w-[40px] h-[40px] flex justify-center items-center hover:bg-opacity-[70%] bg-gray-90 rounded-lg">
                      S
                    </li>
                    <li className="w-[40px] h-[40px] flex justify-center items-center hover:bg-opacity-[70%] bg-gray-90 rounded-lg">
                      L
                    </li>
                    <li className="w-[40px] h-[40px] flex justify-center items-center hover:bg-opacity-[70%] bg-gray-90 rounded-lg">
                      XL
                    </li>
                  </ul>
                </div>
                <div className="w-[40%]">
                  <h1 className="font-semibold text-[20px]">Gender</h1>
                  <p className="text-gray-50">Pick available gender</p>
                  <div className="flex my-2 gap-9">
                    <div className="flex gap-2">
                      <input type="checkbox" name="Men" id="" />
                      <label htmlFor="">Men</label>
                    </div>
                    <div className="flex gap-2">
                      <input type="checkbox" name="Women" id="" />
                      <label htmlFor="">Women</label>
                    </div>
                    <div className="flex gap-2">
                      <input type="checkbox" name="Unisex" id="" />
                      <label htmlFor="">Unisex</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-90 bg-opacity-[20%] w-[40%] p-5 rounded-lg">
              <h1>Upload image</h1>
              <div className="flex flex-col justify-center items-center">
                <img src={main} alt="img" />
                <div className="grid grid-rows-1 grid-cols-4 mt-10 gap-5">
                  <img
                    className="p-3 flex items-center justify-center bg-gray-90 w-full h-full"
                    src={other1}
                    alt="img"
                  />
                  <img
                    className="p-3 flex items-center justify-center bg-gray-90 w-full h-full"
                    src={other2}
                    alt="img"
                  />
                  <img
                    className="p-3 flex items-center justify-center bg-gray-90 w-full h-full"
                    src={other3}
                    alt="img"
                  />
                  <div className="border-4 border-dashed border-green-500 rounded-xl flex items-center justify-center bg-white">
                    <img src={plusBg} alt="icon" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between gap-5">
        <div className="bg-gray-90 bg-opacity-[20%] w-[60%] p-5 rounded-lg">
          <h1 className="font-lato font-bold text-[20px]">Pricing and Stock</h1>
          <div className="flex gap-5 my-2">
            <div className="flex flex-col gap-1">
              <label htmlFor="">Base Pricing</label>
              <input
                className="font-poppins font-medium text-[15px] bg-gray-90 bg-opacity-[40%] p-2 h-8 rounded-md outline-none"
                type="text"
                placeholder="195,000 frw"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="">Stock</label>
              <input
                className="font-poppins font-medium text-[15px] bg-gray-90 bg-opacity-[40%] p-2 h-8 rounded-md outline-none"
                type="number"
                placeholder="44"
              />
            </div>
          </div>
          <div className="flex gap-5 my-2">
            <div className="flex flex-col gap-1">
              <label htmlFor="">Discount</label>
              <input
                className="font-poppins font-medium text-[15px] bg-gray-90 bg-opacity-[40%] p-2 h-8 rounded-md outline-none"
                type="text"
                placeholder="10%"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="">Discount Type</label>
              <select
                name=""
                className="font-poppins font-medium text-[15px] bg-gray-90 bg-opacity-[40%] p-1 h-8 rounded-md outline-none"
                id=""
              >
                <option value="">Percentage</option>
                <option value="">Amount</option>
              </select>
            </div>
          </div>
        </div>
        <div className="bg-gray-90 bg-opacity-[20%] w-[40%] p-5 rounded-lg">
          <h1 className="font-lato font-bold text-[20px]">Category</h1>
          <div className="my-2">
            <p>Product category</p>
            <select
              name=""
              className="font-poppins font-medium text-[15px] bg-gray-90 bg-opacity-[40%] p-2 h-10 rounded-md outline-none w-[50%]"
              id=""
            >
              <option value="">Home & Lifestyle</option>
              <option value="">others</option>
              <option value="">others</option>
              <option value="">others</option>
            </select>
          </div>
          <div className="my-2">
            <p>Browse category</p>
            <select
              name=""
              className="font-poppins font-medium text-[15px] bg-gray-90 bg-opacity-[40%] p-2 h-10 rounded-md outline-none w-[50%]"
              id=""
            >
              <option value="">Jacket</option>
              <option value="">others</option>
              <option value="">others</option>
              <option value="">others</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
