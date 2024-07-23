import React, { useState } from "react";
import { OrderModal2 } from "../components";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const OrderKigali = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleBuyClick = () => {
    {
      //   setShowModal(true);
      toast.success(
        "Murakoze kugura iki gicuruzwa, ibyo mwatumije birabageraho vuba!"
      );
    }
  };
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex-1 m-[20px]">
        <div>
          <h1>Ibyo ugiye kugura:</h1>
          <p>Order details (name, quantity, subtotal)</p>
        </div>
        <div className="my-[20px] flex flex-col gap-3">
          <p className="">
            👏🏿Ibyo mwatumije biratwara
            isaha 1 kugirango bibagereho
          </p>
          <p>📞Turabahamagara kuri telephone mwaduhaye!</p>
          <p>
            <span className="text-primary text-xl m-2">NB:</span>
            Iyo ugize ikibazo kuri order yawe utubwira mbere yamasaha 24
            tukagusubiza amafaranga yawe ukishyura transport
          </p>
        </div>
        <button
          className="py-[10px] px-[50px] rounded-lg bg-blue2 text-white hover:bg-blue3 transition-all duration-3000"
          onClick={handleBuyClick}
        >
          Gura
        </button>
      </div>
      <OrderModal2 isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
};

export default OrderKigali;
