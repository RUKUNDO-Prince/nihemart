import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { delivery, whatsapp } from "../assets";
import useOrderStore from "../store/OrderDetails";

const OrderModal1 = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleClose = (e) => {
    if (e.target.id === "wrapper") onClose();
  };

  const { id } = useParams();
  const [productDetails, setProductDetails] = useState(null);
  const [error, setError] = useState(null);
  
  const queryParams = new URLSearchParams(window.location.search);
  const quantity = queryParams.get("quantity");
  const category = queryParams.get("category");

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:3000/product/singleProduct/${id}`);
        
        console.log(`Response status: ${response.status}`);

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Error response:", errorText);
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched product details:", data);
        setProductDetails(data.product);
      } catch (error) {
        console.error("Error fetching product details:", error);
        setError(error.message);
      }
    };

    fetchProductDetails();
  }, [id]);

  if (error) return <div>Error: {error}</div>;
  if (!productDetails) return <div>Loading...</div>;

  const { name: itemName, price } = productDetails;

  const whatsappMessage = `Ndashaka gutumiza igicuruzwa kuri nihemart: ` +
    `Izina: ${itemName} | ` +
    `Umubare: ${quantity} | ` +
    `Icyiciro: ${category} | ` +
    `Igiciro: ${price} Frw`;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
      id="wrapper"
      onClick={handleClose}
    >
      <div className="flex flex-col">
        <button
          className="text-white text-2xl place-self-end md:mr-[50px] mr-[20px]"
          onClick={() => onClose()}
        >
          x
        </button>
        <div className="bg-white p-10 rounded-lg md:h-[50vh] h-[60vh] w-[90%] m-auto flex flex-col gap-5 overflow-scroll">
          <p className="">
            👏🏿Murakoze guhitamo kugura iki gicuruzwa, ibyo mwatumije biratwara
            amasaha 2 kugirango bibagereho
          </p>
          <p>📞Turabahamagara kuri telephone mwaduhaye, mube mwiteguye </p>
          <p>
            <span className="text-primary text-xl m-2">NB:</span>
            Iyo ugize ikibazo kuri order yawe utubwira mbere yamasaha 24
            tukagusubiza amafaranga yawe ukishyura transport
          </p>
          <p className="m-auto font-semibold">
            Niba mushaka gukomeza, mwakanda button ikurikira ubundi mugatumiza
            kuri whatsapp
          </p>
          <div className="flex items-center gap-3 bg-[#00FF38] rounded-lg px-[50px] py-[10px] m-auto">
            <img src={whatsapp} alt="" />
            <a href={`https://wa.me/250792412177?text=${encodeURIComponent(whatsappMessage)}`} target="_blank">
              <button className="text-white">Whatsapp</button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderModal1;
