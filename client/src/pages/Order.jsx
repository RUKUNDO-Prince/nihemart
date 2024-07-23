import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { OrderModal1 } from "../components";

const Order = () => {
  const [showModal, setShowModal] = useState(false);
  const [city, setCity] = useState("");
  const [deliveryFee, setDeliveryFee] = useState(null);
  const [destination, setDestination] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

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
    navigate("/ibicuruzwa-byose");
  };

  const handleBuyClick = () => {
    if (city === "Kigali") {
      navigate(`/tumiza/${id}/kigali`);
    } else {
      setShowModal(true);
    }
  };

  const validatePhone = (number) => {
    // Regex to match exactly 10 digits
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(number);
  };

  const validateName = (name) => {
    // Regex to match non-empty name with only letters and spaces
    const nameRegex = /^[A-Za-z\s]+$/;
    return name.length > 0 && nameRegex.test(name);
  };

  const handlePhoneChange = (event) => {
    const value = event.target.value;
    setPhone(value);

    if (!validatePhone(value)) {
      setPhoneError("Nimero igomba kuba imibare icumi.");
    } else {
      setPhoneError("");
    }
  };

  const handleNameChange = (event) => {
    const value = event.target.value;
    setName(value);

    if (!validateName(value)) {
      setNameError("Izina rigomba kuba rigizwe n'inyuguti n'imyanya gusa, kandi ntago rigomba kuba ririmo ubusa.");
    } else {
      setNameError("");
    }
  };

  const isFormComplete = () => {
    return (
      name.trim() !== "" &&
      validateName(name) &&
      phone.trim() !== "" &&
      validatePhone(phone) &&
      city.trim() !== "" &&
      (city !== "Kigali" || destination.trim() !== "")
    );
  };

  return (
    <>
      <div className="px-5 md:px-10 py-5">
        <p className="text-gray-90 font-regular text-[14px] font-poppins">
          / Gaming / Tumiza / <span className="text-black">Info</span>
        </p>
        <p className="text-primary font-poppins font-semibold text-[16px] my-[20px]">
          Uzuza form ikurikira 🖋️
        </p>
        <div className="grid gap-5 grid-cols-1 md:grid-cols-2">
          <form
            action=""
            className="bg-[#3B7EF8] bg-opacity-[5%] p-[20px] rounded-md"
          >
            <h1 className="font-bold text-[16px] font-lato mb-[20px]">
              Imyirondoro
            </h1>
            <div className="flex flex-col gap-2">
              <label htmlFor="">Amazina *</label>
              <input
                required
                type="text"
                className="bg-[#D9D9D9] bg-opacity-[38%] outline-none w-full p-[10px] rounded-md"
                value={name}
                onChange={handleNameChange}
              />
              {nameError && <div className="text-red-500 text-sm">{nameError}</div>}
            </div>
            {/* <div className="flex flex-col gap-2 mt-2">
              <label htmlFor="">Email</label>
              <input
                type="email"
                className="bg-[#D9D9D9] bg-opacity-[38%] outline-none w-full p-[10px] rounded-md"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div> */}
            <div className="flex flex-col gap-2 mt-2">
              <label htmlFor="">Numero ya telephone *</label>
              <input
                required
                maxLength={10}
                type="text"
                className="bg-[#D9D9D9] bg-opacity-[38%] outline-none w-full p-[10px] rounded-md"
                value={phone}
                onChange={handlePhoneChange}
              />
              {phoneError && <div className="text-red-500 text-sm">{phoneError}</div>}
            </div>
          </form>
          <form
            action=""
            className="bg-[#3B7EF8] bg-opacity-[5%] p-[20px] rounded-md"
          >
            <h1 className="font-bold font-lato text-[16px] mb-[20px]">
              Aho muherereye
            </h1>
            <div className="flex flex-col gap-3">
              <label htmlFor="">Umujyi</label>
              <select
                name=""
                id=""
                className="bg-[#D9D9D9] bg-opacity-[38%] outline-none w-full p-[10px] rounded-md"
                value={city}
                onChange={handleCityChange}
              >
                <option value="">Hitamo umujyi</option>
                <option value="Kigali">Kigali</option>
                <option value="Amajyepfo">Amajyepfo</option>
                <option value="Amajyaruguru">Amajyaruguru</option>
                <option value="Iburasirazuba">Iburasirazuba</option>
                <option value="Iburengerazuba">Iburengerazuba</option>
              </select>
            </div>
            {city === "Kigali" && (
              <div className="flex flex-col gap-2">
                <label htmlFor="">Agace</label>
                <select
                  name=""
                  id=""
                  className="bg-[#D9D9D9] bg-opacity-[38%] outline-none w-full p-[10px] rounded-md"
                  value={destination}
                  onChange={handleDestinationChange}
                >
                  <option value="">Hitamo agace</option>
                  <option value="Nyarugenge">Nyarugenge</option>
                  <option value="Gasabo">Gasabo</option>
                  <option value="Kicukiro">Kicukiro</option>
                </select>
              </div>
            )}
            {deliveryFee !== null && (
              <div className="flex flex-col gap-2">
                <label htmlFor="" className="mt-2">Amafaranga yo kubikugezaho (frw)</label>
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
          🔔Wishyura umaze kubona ibyo watumije
        </h1>
        <div className="flex gap-3 justify-center md:justify-end">
          <button
            className="py-[10px] px-[50px] border-blue2 border-[1px] rounded-lg"
            onClick={handleLeaveClick}
          >
            Subira inyuma
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
            Gura
          </button>
        </div>
      </div>
      <OrderModal1 isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
};

export default Order;
