import React, { useEffect, useState } from "react";
import { productsList, singleProduct } from "../constants/data";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { delivery, whatsapp, circle } from "../assets";
import { ProductsList, SubHeading } from "../components";
import { useParams } from "react-router-dom";

const Product = () => {
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);


  const params = useParams();
  const selectedProductId = params.id;

  const returnSelectedProduct = () => {
    const singleProd = singleProduct.filter(
      (product) => product.id === parseInt(selectedProductId)
    );
    setProduct(singleProd);
    setSelectedImage(singleProd[0].imgs[0]);
  };
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    returnSelectedProduct();
  }, []);
  return (
    <div className=" px-5 md:px-10">
      {product ? (
        <div>
          {product?.map((item, index) => (
            <div key={index}>
              <p className="m-[20px] text-gray-90">
                / {item.category} /{" "}
                <span className="text-black">{item.name}</span>
              </p>
              <div className="flex flex-col lg:flex-row justify-between md:gap-5">
                {/* images container */}
                <div className="flex lg:w-1/2 flex-col md:flex-row">
                  <div className=" md:min-w-[100px] w-full md:w-[15%] min-h-full flex gap-5 flex-row md:flex-col justify-between md:justify-start my-[10px] overflow-x-auto no-scrollbar ">
                    {item.imgs.map((img, index) => (
                      <img
                        className={`bg-gray-90 bg-opacity-[30%] p-[20px] hover:bg-opacity-[20%] w-[150px] md:w-full ${selectedImage === img ? "border-2 border-primary/50":"border-2"} rounded-md`}
                        src={img}
                        alt="img"
                        key={index}
                        onClick={()=>setSelectedImage(img)}
                      />
                    ))}
                  </div>
                  <div className="bg-gray-90 bg-opacity-[30%] flex items-center justify-center content-center px-[40px] my-[10px]  md:ml-[20px] hover:bg-opacity-[20%] w-full rounded-md overflow-hidden">
                    <img src={selectedImage} alt="item" className=" w-full md:min-w-[441px] max-h-[331px] object-contain" />
                  </div>
                </div>

                <div className="flex flex-col gap-3 lg:w-1/2 px-5">
                  <h1 className="text-[24px] font-semibold">{item.name}</h1>
                  <div className="flex gap-3">
                    <p>{item.starCount}</p>
                    <p className="text-gray-90">({item.reviewCount})</p> |
                    <p className="text-[#00FF66]">
                      {item.isAvailable ? "In Stock" : "Waiting for more"}
                    </p>
                  </div>
                  <p className="text-primary font-semibold text-[24px]">
                    {item.updatedPrice} frw{" "}
                    <span className="text-gray-90 line-through">
                      {item.price} frw
                    </span>
                  </p>
                  <p className="text-black text-[16px]">{item.desc}</p>
                  <hr />
                  <p className="font-semibold text-[24px]">Size: </p>
                  <div className="flex gap-5">
                    <div className="w-[100px] md:min-w-[150px] px-[10px] border-[1px] border-gray-90 rounded-md flex justify-between items-center">
                      <FaMinus className="" />
                      <p>2</p>
                      <FaPlus />
                    </div>
                    <button className="bg-primary px-[30px] py-[10px] rounded-md hover:bg-opacity-[90%] text-white">
                      Add To Cart
                    </button>
                  </div>
                  <div className="border-[2px] border-gray-80 rounded-lg ">
                    <div className="m-[20px]">
                      <div className="flex items-center gap-3">
                        <img src={delivery} alt="delivery-icon" />
                        <p>Order</p>
                      </div>
                      <div className="flex items-center gap-3 bg-[#00FF38] rounded-lg w-fit px-[10px] py-[10px]">
                        <img src={whatsapp} alt="" />
                        <button className="text-white">Whatsapp</button>
                      </div>
                    </div>
                    <hr className="bg-gray-90 h-[2px]" />
                    <div className="m-[20px]">
                      <img src={circle} alt="icon" />
                      <div>
                        <h1>Return Delivery</h1>
                        <p>
                          Free 24 hours Delivery Returns. <span>Details</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <h2>Loading...</h2>
        </div>
      )}
      <div className="my-[20px]">
        <SubHeading title="Relate Items" />
        <ProductsList maxProducts={4} />
      </div>
    </div>
  );
};

export default Product;
