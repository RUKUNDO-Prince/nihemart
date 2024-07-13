import React from "react";
import { useNavigate } from "react-router-dom";
import { delivery, whatsapp } from "../assets";

const OrderModal2 = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleClose = (e) => {
    if (e.target.id === "wrapper") onClose();
  };

  const handleViewProducts = () => {
    navigate("/products");
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
      id="wrapper"
      onClick={handleClose}
    >
      <div className="flex flex-col">
        <button
          className="text-white text-2xl place-self-end mr-[65px]"
          onClick={() => onClose()}
        >
          x
        </button>
        <div className="bg-white p-10 rounded-lg h-[50vh] w-[90%] m-auto flex flex-col gap-5">
          <p className="">
            👏🏿Thanks for making this decision, your order will take time to
            reach you
          </p>
          <p>
            📞We Will Call You Using The Phone Number You Provided Stay Alerted{" "}
          </p>
          <p>
            <span className="text-primary text-xl m-2">NB:</span>
            If You Have Problem On your Order Please Notify Us Before 24 hrs, So
            As We Return your Money And Get The order But You Will Pay For The
            Delivery Fee.
          </p>
          <p className="m-auto font-semibold">
            Your order have been well received, you may check out our other products
          </p>
          <div
            className="flex items-center gap-3 bg-blue3 hover:bg-blue2 rounded-lg px-[50px] py-[10px] m-auto cursor-pointer"
            onClick={handleViewProducts}
          >
            <button className="text-white">View our products</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderModal2;
