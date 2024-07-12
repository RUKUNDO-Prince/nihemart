import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { OrderModal1, OrderModal2 } from "../components";

const Order = () => {
  const [showModal, setShowModal] = useState(false);
  const [city, setCity] = useState("");
  const [deliveryFee, setDeliveryFee] = useState(null);
  const [destination, setDestination] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const navigate = useNavigate();

  const handleCityChange = (event) => {
    const selectedCity = event.target.value;
    setCity(selectedCity);
    setDestination("");
    if (selectedCity === "Kigali") {
      setDeliveryFee(null);
    } else if (selectedCity) {
      setDeliveryFee(2000);
    } else {
      setDeliveryFee(null);
    }
  };

  const handleDestinationChange = (event) => {
    setDestination(event.target.value);
    if (event.target.value) {
      setDeliveryFee(1000);
    } else {
      setDeliveryFee(null);
    }
  };

  const handleLeaveClick = () => {
    navigate("/");
  };

  const handleBuyClick = () => {
    setShowModal(true);
  };

  const isFormComplete = () => {
    return (
      name.trim() !== "" &&
      email.trim() !== "" &&
      phone.trim() !== "" &&
      city.trim() !== "" &&
      (city !== "Kigali" || destination.trim() !== "")
    );
  };

  return (
    <>
      <div className="px-5 md:px-10 py-5">
        <p className="text-gray-90 font-regular text-[14px] font-poppins">
          / Gaming / Order / <span className="text-black">Info</span>
        </p>
        <p className="text-primary font-poppins font-semibold text-[16px] my-[20px]">
          Fill the following 🖋️
        </p>
        <div className="grid gap-5 grid-cols-1 md:grid-cols-2">
          <form
            action=""
            className="bg-[#3B7EF8] bg-opacity-[5%] p-[20px] rounded-md"
          >
            <h1 className="font-bold text-[16px] font-lato mb-[20px]">
              Personal information
            </h1>
            <div className="flex flex-col gap-3">
              <label htmlFor="">Name</label>
              <input
                type="text"
                className="bg-[#D9D9D9] bg-opacity-[38%] outline-none w-full p-[10px] rounded-md"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor="">Email</label>
              <input
                type="text"
                className="bg-[#D9D9D9] bg-opacity-[38%] outline-none w-full p-[10px] rounded-md"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor="">Phone Number</label>
              <input
                type="text"
                className="bg-[#D9D9D9] bg-opacity-[38%] outline-none w-full p-[10px] rounded-md"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </form>
          <form
            action=""
            className="bg-[#3B7EF8] bg-opacity-[5%] p-[20px] rounded-md"
          >
            <h1 className="font-bold font-lato text-[16px] mb-[20px]">
              Location
            </h1>
            <div className="flex flex-col gap-3">
              <label htmlFor="">City</label>
              <select
                name=""
                id=""
                className="bg-[#D9D9D9] bg-opacity-[38%] outline-none w-full p-[10px] rounded-md"
                value={city}
                onChange={handleCityChange}
              >
                <option value="">Select city</option>
                <option value="Kigali">Kigali</option>
                <option value="Amajyepfo">Amajyepfo</option>
                <option value="Amajyaruguru">Amajyaruguru</option>
                <option value="Iburasirazuba">Iburasirazuba</option>
                <option value="Iburengerazuba">Iburengerazuba</option>
              </select>
            </div>
            {city === "Kigali" && (
              <div className="flex flex-col gap-3">
                <label htmlFor="">Destination</label>
                <select
                  name=""
                  id=""
                  className="bg-[#D9D9D9] bg-opacity-[38%] outline-none w-full p-[10px] rounded-md"
                  value={destination}
                  onChange={handleDestinationChange}
                >
                  <option value="">Select destination</option>
                  <option value="Nyarugenge">Nyarugenge</option>
                  <option value="Gasabo">Gasabo</option>
                  <option value="Kicukiro">Kicukiro</option>
                </select>
              </div>
            )}
            {deliveryFee !== null && (
              <div className="flex flex-col gap-3">
                <label htmlFor="">Delivery Fee (frw)</label>
                <input
                  type="text"
                  className="bg-[#D9D9D9] bg-opacity-[38%] outline-none w-full p-[10px] rounded-md"
                  value={deliveryFee}
                  readOnly
                />
              </div>
            )}
          </form>
        </div>
        <h1 className="text-primary font-bold font-poppins text-[24px] my-[20px] text-center md:text-start">
          🔔You pay after getting the product
        </h1>
        <div className="flex gap-3 justify-center md:justify-end">
          <button
            className="py-[10px] px-[50px] border-blue2 border-[1px] rounded-lg"
            onClick={handleLeaveClick}
          >
            Leave
          </button>
          <button
            className={`py-[10px] px-[50px] rounded-lg ${
              isFormComplete()
                ? "bg-blue2 text-white hover:bg-blue3 transition-all duration-3000"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            onClick={isFormComplete() ? handleBuyClick : null}
            disabled={!isFormComplete()}
          >
            Buy
          </button>
        </div>
      </div>
      {city === "Kigali" ? (
        <OrderModal2 isOpen={showModal} onClose={() => setShowModal(false)} />
      ) : (
        <OrderModal1 isOpen={showModal} onClose={() => setShowModal(false)} />
      )}
    </>
  );
};

export default Order;





// THE CODES WILL HELP ONE TO TRACK THE ID OF THE PRODUCT ORDERED
// IT CONTAINS THE UPDATED ORDER COMPONENT



// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { OrderModal1, OrderModal2 } from "../components";

// const Order = () => {
//   const [showModal, setShowModal] = useState(false);
//   const [city, setCity] = useState("");
//   const [deliveryFee, setDeliveryFee] = useState(null);
//   const [destination, setDestination] = useState("");
//   const [formCompleted, setFormCompleted] = useState(false);
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");

//   const { id } = useParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     setFormCompleted(
//       name !== "" && email !== "" && phone !== "" && city !== "" && destination !== ""
//     );
//   }, [name, email, phone, city, destination]);

//   const handleCityChange = (event) => {
//     const selectedCity = event.target.value;
//     setCity(selectedCity);
//     setDestination("");
//     if (selectedCity === "Kigali") {
//       setDeliveryFee(null);
//     } else if (selectedCity) {
//       setDeliveryFee(2000);
//     } else {
//       setDeliveryFee(null);
//     }
//   };

//   const handleDestinationChange = (event) => {
//     setDestination(event.target.value);
//     if (event.target.value) {
//       setDeliveryFee(1000);
//     } else {
//       setDeliveryFee(null);
//     }
//   };

//   const handleLeaveClick = () => {
//     navigate("/");
//   };

//   return (
//     <>
//       <div className="px-5 md:px-10 py-5">
//         <p className="text-gray-90 font-regular text-[14px] font-poppins">
//           / Gaming / Order / <span className="text-black">Info</span>
//         </p>
//         <p className="text-primary font-poppins font-semibold text-[16px] my-[20px]">
//           Fill the following 🖋️
//         </p>
//         <div className="grid gap-5 grid-cols-1 md:grid-cols-2">
//           <form
//             action=""
//             className="bg-[#3B7EF8] bg-opacity-[5%] p-[20px] rounded-md"
//           >
//             <h1 className="font-bold text-[16px] font-lato mb-[20px]">
//               Personal information
//             </h1>
//             <div className="flex flex-col gap-3">
//               <label htmlFor="">Name</label>
//               <input
//                 type="text"
//                 className="bg-[#D9D9D9] bg-opacity-[38%] outline-none w-full p-[10px] rounded-md"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//               />
//             </div>
//             <div className="flex flex-col gap-3">
//               <label htmlFor="">Email</label>
//               <input
//                 type="text"
//                 className="bg-[#D9D9D9] bg-opacity-[38%] outline-none w-full p-[10px] rounded-md"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>
//             <div className="flex flex-col gap-3">
//               <label htmlFor="">Phone Number</label>
//               <input
//                 type="text"
//                 className="bg-[#D9D9D9] bg-opacity-[38%] outline-none w-full p-[10px] rounded-md"
//                 value={phone}
//                 onChange={(e) => setPhone(e.target.value)}
//               />
//             </div>
//           </form>
//           <form
//             action=""
//             className="bg-[#3B7EF8] bg-opacity-[5%] p-[20px] rounded-md"
//           >
//             <h1 className="font-bold font-lato text-[16px] mb-[20px]">
//               Location
//             </h1>
//             <div className="flex flex-col gap-3">
//               <label htmlFor="">City</label>
//               <select
//                 name=""
//                 id=""
//                 className="bg-[#D9D9D9] bg-opacity-[38%] outline-none w-full p-[10px] rounded-md"
//                 value={city}
//                 onChange={handleCityChange}
//               >
//                 <option value="">Select city</option>
//                 <option value="Kigali">Kigali</option>
//                 <option value="Amajyepfo">Amajyepfo</option>
//                 <option value="Amajyaruguru">Amajyaruguru</option>
//                 <option value="Iburasirazuba">Iburasirazuba</option>
//                 <option value="Iburengerazuba">Iburengerazuba</option>
//               </select>
//             </div>
//             {city === "Kigali" && (
//               <div className="flex flex-col gap-3">
//                 <label htmlFor="">Destination</label>
//                 <select
//                   name=""
//                   id=""
//                   className="bg-[#D9D9D9] bg-opacity-[38%] outline-none w-full p-[10px] rounded-md"
//                   value={destination}
//                   onChange={handleDestinationChange}
//                 >
//                   <option value="">Select destination</option>
//                   <option value="Nyarugenge">Nyarugenge</option>
//                   <option value="Gasabo">Gasabo</option>
//                   <option value="Kicukiro">Kicukiro</option>
//                 </select>
//               </div>
//             )}
//             {deliveryFee !== null && (
//               <div className="flex flex-col gap-3">
//                 <label htmlFor="">Delivery Fee (frw)</label>
//                 <input
//                   type="text"
//                   className="bg-[#D9D9D9] bg-opacity-[38%] outline-none w-full p-[10px] rounded-md"
//                   value={deliveryFee}
//                   readOnly
//                 />
//               </div>
//             )}
//           </form>
//         </div>
//         <h1 className="text-primary font-bold font-poppins text-[16px] my-[20px]">
//           Delivery time 24 hours
//         </h1>
//         <div className="flex gap-5">
//           <button
//             className="px-[30px] py-[10px] bg-primary text-white rounded-md"
//             onClick={() => setShowModal(true)}
//             disabled={!formCompleted}
//           >
//             Place Order
//           </button>
//           <button
//             className="px-[30px] py-[10px] bg-[#D9D9D9] text-black rounded-md"
//             onClick={handleLeaveClick}
//           >
//             Leave
//           </button>
//         </div>
//       </div>
//       <OrderModal1 showModal={showModal} setShowModal={setShowModal} />
//       <OrderModal2 />
//     </>
//   );
// };

// export default Order;
