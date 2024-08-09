import React, { useEffect, useState } from "react";
import useOrderStore from "../store/orderStore";
import { useNavigate, useParams } from "react-router-dom";
import { SubHeading } from "../components";
import { displayNumbers } from "../utils/usableFuncs";
import SelectStatus from "../components/common/SelectStatus";
import useStatusUpdater from "../store/statusStore";

const OrderDetails = () => {
  const params = useParams();
  const orderId = params.id;

  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState(null);

  const navigate = useNavigate();

  const { getOrderById, isLoading, deleteOrder } = useOrderStore();

  const updateOrderStatus = useStatusUpdater((state) => state.updateOrderStatus);

  const getOrder = async () => {
    const order = await getOrderById(orderId);
    setOrder(order);
    setStatus(order?.status);
  };

  useEffect(() => {
    getOrder();
  }, []);

  const updateStatus = async (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    updateOrderStatus(orderId, newStatus);
  };

  const handleOrderDeletion = async () => {
    await deleteOrder(orderId);
    navigate("/orders");
  };

  const total = order?.productDetails?.reduce((acc, product) => {
    return acc + product.price * product.quantity;
  }, 0);
  return (
    <>
      {isLoading ? (
        <div className="flex-1 flex items-center justify-center">
          Loading...
        </div>
      ) : (
        order && (
          <div className="flex-1 p-[30px] flex flex-col font-poppins">
            <SubHeading title="Order details" />
            <div className="flex flex-col gap-2 mt-3 w-[100%] lg:w-[70%] self-center">
              <div className=" flex justify-between">
                <h2>Customer Name</h2>
                <h2>{order?.name}</h2>
              </div>
              <div className=" flex justify-between">
                <h2>Phone</h2>
                <h2>{order?.phone}</h2>
              </div>
              <div className=" flex justify-between">
                <h2>Location</h2>
                <h2>
                  {order?.province} {order?.city ? `,${order?.city}` : ""}
                </h2>
              </div>
              <div className=" flex justify-between">
                <h2>Delivery Fee</h2>
                <h2>{order?.deliveryFee}</h2>
              </div>
              <div className=" flex justify-between">
                <h2>order status</h2>
                <h2>{order?.status}</h2>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-3">
                {order?.productDetails?.length > 0 &&
                  order?.productDetails?.map((product, idx) => (
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
              <div className="mt-3 flex justify-end">
                {order?.productDetails?.length > 0 ? (
                  <div>
                    Total Price:{" "}
                    <span className="text-black font-bold">
                      {displayNumbers(total)} Frw
                    </span>
                  </div>
                ) : null}
              </div>
              <div className="flex justify-end gap-3">
                <button
                  onClick={handleOrderDeletion}
                  className="bg-primary/80 px-5 py-2 rounded-md text-white hover:bg-primary font-semibold transition-all duration-600 mt-4"
                >
                  Delete order
                </button>
                <SelectStatus status={status} updateStatus={updateStatus} />
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default OrderDetails;
