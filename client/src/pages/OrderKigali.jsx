import React, { useState } from "react";
import { OrderModal2 } from "../components";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useOrderStore from "../store/OrderDetails";
import { displayNumbers } from "../utils/usableFuncs";

const OrderKigali = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const { orderDetails, kigaliOrder, clearOrderDetails } = useOrderStore();

  console.log("this is the order details: ", orderDetails);

  const handleBuyClick = async () => {
    await kigaliOrder();

    setTimeout(() => {
      clearOrderDetails();
    }, 2000);
  };

  const productDetails = orderDetails.productDetails;

  const total = productDetails.reduce((acc, product) => {
    return acc + product.price * product.quantity;
  }, 0);
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex-1 m-[20px]">
        <div>
          <h1>Ibyo ugiye kugura:</h1>
          <div className="grid grid-cols-3 gap-3 mt-3">
            {productDetails?.length > 0 &&
              productDetails?.map((product, idx) => (
                <div
                  className=" border border-primary px-3 py-2 w- rounded-lg"
                  key={idx}
                >
                  <h2 className="text-black font-bold flex items-center justify-between border-b pb-1">
                    product name:{" "}
                    <span className="font-normal">{product.name}</span>
                  </h2>
                  <h2 className="text-black font-bold flex items-center justify-between border-b pb-1">
                    product unit price:{" "}
                    <span className="font-normal">{product.price}</span>
                  </h2>
                  <h2 className="text-black font-bold flex items-center justify-between border-b pb-1">
                    quantity:{" "}
                    <span className="font-normal">{product.quantity}</span>
                  </h2>
                  <h2 className="text-black font-bold flex items-center justify-between">
                    Ayo urishyura:{" "}
                    <span className="font-normal">
                      {displayNumbers(product.price * product.quantity)} Frw
                    </span>
                  </h2>
                </div>
              ))}
          </div>
          <div className="mt-3">
            {productDetails?.length > 0 ? (
              <div>
                Total Price:{" "}
                <span className="text-black font-bold">
                  {displayNumbers(total)} Frw
                </span>
              </div>
            ) : null}
          </div>
        </div>
        <div className="my-[20px] flex flex-col gap-3">
          <p className="">
            👏🏿Ibyo mwatumije biratwara isaha 1 kugirango bibagereho
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
