import React, { useEffect, useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { delivery, whatsapp, circle, cart } from "../assets";
import { SubHeading } from "../components";
import { useParams, useNavigate } from "react-router-dom";
import useProductStore from "../store/productStore";
import { api } from "../config/axiosInstance";
import { StarRating } from "../components/ProductCard";
import ProductListComp from "../components/ProductListComp";
import { IoBagCheckOutline } from "react-icons/io5";
const Product = () => {
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const { getProductById, fetchProducts } = useProductStore();

  const params = useParams();
  const selectedProductId = params.id;
  const navigate = useNavigate();

  const returnSelectedProduct = async () => {
    const productData = await getProductById(selectedProductId);
    setProduct(productData);
    setSelectedImage(productData.photos[0]);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    returnSelectedProduct();
    fetchProducts();
  }, [selectedProductId]);

  const handleOrderNowClick = () => {
    navigate(`/tumiza/${selectedProductId}`);
  };

  const handleNavigateToHelp = () => {
    navigate("/ubufasha");
  };

  const incrementQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };
  return (
    <div className=" px-5 md:px-10">
      {product ? (
        <div>
          <div>
            <p className="m-[20px] text-gray-90">
              / {product.category} /{" "}
              <span className="text-black">{product.name}</span>
            </p>
            <div className="flex flex-col lg:flex-row justify-between md:gap-5">
              {/* images container */}
              <div className="flex lg:w-1/2 flex-col md:flex-row">
                <div className=" md:min-w-[100px] w-full md:w-[15%] min-h-full flex gap-5 flex-row md:flex-col justify-between md:justify-start my-[10px] overflow-x-auto no-scrollbar ">
                  {product?.photos?.map((img, index) => (
                    <img
                      className={`bg-gray-90 bg-opacity-[30%] p-[20px] hover:bg-opacity-[20%] w-[150px] md:w-full ${
                        selectedImage === img
                          ? "border-2 border-primary/50"
                          : "border-2"
                      } rounded-md`}
                      src={`${api + "/" + img}`}
                      alt="img"
                      key={index}
                      onClick={() => setSelectedImage(img)}
                    />
                  ))}
                </div>
                <div className="bg-gray-90 bg-opacity-[30%] flex items-center justify-center content-center px-[40px] my-[10px]  md:ml-[20px] hover:bg-opacity-[20%] w-full rounded-md overflow-hidden">
                  <img
                    src={`${api + "/" + selectedImage}`}
                    alt="item"
                    className=" w-full md:min-w-[441px] max-h-[331px] object-contain"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-3 lg:w-1/2 px-5">
                <h1 className="text-[24px] font-semibold">{product.name}</h1>
                <div className="flex gap-3 items-center">
                  {/* <StarRating starCount={product.averageRating} />
                  <p className="text-gray-90">({product.ratings?.length})</p> | */}
                  <p className="text-[#00FF66]">
                    {product.quantity
                      ? ` ${product.quantity} muri stock`
                      : "dutegereje ibindi"}
                  </p>
                </div>
                <p className="text-primary font-semibold text-[24px] flex items-center gap-3">
                  {product.priceAfterDiscount} frw{" "}
                  <span className="text-gray-90 line-through text-lg">
                    {product.price} frw
                  </span>
                </p>
                <hr />
                <p className="font-semibold text-[24px] flex items-center gap-3">
                  Ingano:
                  {product?.size?.map((size, idx) => (
                    <span key={idx} className="text-md font-normal">
                      {size}
                    </span>
                  ))}
                </p>
                <div className="flex gap-5">
                  <div className="w-[100px] md:min-w-[150px] px-[10px] border-[1px] border-gray-90 rounded-md flex justify-between items-center">
                    <div
                      className="flex items-center gap-2 justify-between"
                      onClick={decrementQuantity}
                    >
                      <FaMinus className="cursor-pointer" />
                      <div className="h-[40px] w-[0.5px] bg-black"></div>
                    </div>
                    <p>{quantity}</p>
                    <div
                      className="flex items-center gap-2 justify-between"
                      onClick={incrementQuantity}
                    >
                      <div className="h-[40px] w-[0.5px] bg-black"></div>
                      <FaPlus className="cursor-pointer" />
                    </div>
                  </div>
                  <button className="bg-primary w-[27%] px-2 py-[10px] rounded-md hover:bg-opacity-[60%] transition-all duration-600 text-white flex justify-between items-start">
                    <img src={cart} alt="" />
                    Shyira mu gatebo
                  </button>
                </div>
                <div className="border-[2px] border-gray-80 rounded-lg ">
                  <div className="m-[20px] flex justify-between">
                    <div className="">
                      <img src={delivery} alt="icon" />
                      <div>
                        <p>
                          Niba ukunze iki gicuruzwa ukaba ushaka kugitumiza kanda aha →
                        </p>
                      </div>
                    </div>
                    <div
                      className="flex items-center gap-3 bg-blue3 rounded-lg px-[20px] h-fit py-[10px] my-auto hover:bg-opacity-[70%] cursor-pointer"
                      onClick={handleOrderNowClick}
                    >
                      <IoBagCheckOutline className="text-white" size={30} />
                      <button className="text-white">Gura</button>
                    </div>
                  </div>
                  <hr className="bg-gray-90 h-[2px]" />
                  <div className="m-[20px]">
                    <img src={circle} alt="icon" />
                    <div>
                      <h1>Igihe wasubizwa amafaranga</h1>
                      <p className="flex flex-col">
                        Iyo ugize ikibazo kuri order yawe utubwira mbere y'amasaha 24 tukayagusubiza ukishyura transport.{" "}
                        <span
                          className="hover:underline text-gray-60"
                          onClick={handleNavigateToHelp}
                        >
                          Kumenya byinshi
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <h2>Loading...</h2>
        </div>
      )}
      <div className="my-2">
        <h1 className="font-semibold font-poppins text-2xl">Ubusobanuro bw'igicuruzwa</h1>
        <p className="text-black text-[16px]">{product.description}</p>
      </div>
      <div className="my-[20px]">
        <SubHeading title="Ibindi byerekeranye" />
        <ProductListComp maxProducts={4} selectedId={selectedProductId} />
      </div>
    </div>
  );
};

export default Product;
