import React, { useEffect } from "react";
import { ProductsList, SubHeading } from "../components";
import { Link } from "react-router-dom";
import { likesData } from "../constants/data";
import { deliver } from "../assets";
import useLikedProductsStore from "../store/likedProducts";
import useAuthStore from "../store/authStore";
import { api } from "../config/axiosInstance";
import { displayNumbers } from "../utils/usableFuncs";
import ExpandableText from "../components/ExpandableText";
import { useNavigate } from "react-router-dom";
import useOrderStore from "../store/OrderDetails";

const Likes = () => {
  const initializeLikedProducts = useLikedProductsStore(
    (state) => state.initializeLikedProducts
  );
  const removeLikedProducts = useLikedProductsStore(
    (state) => state.removeLikedProducts
  );

  const { addProduct } = useOrderStore();

  const user = useAuthStore((state) => state.user);
  const { likedProducts, isLoading } = useLikedProductsStore();


  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (user) {
      initializeLikedProducts();
    } else {
      removeLikedProducts();
    }
  }, [user]);

  const navigate = useNavigate();

  const handleOrderNowClick = (product) => {
    const productDetails = {
      name:product.name,
      price: product.price ,
      quantity:1,
    }
    addProduct(productDetails)
    navigate(`/tumiza/${product?._id}?category=${product.category}`);
  };
  return (
    <div className=" p-[20px] md:p-[50px] flex-1 flex flex-col">
      <h1 className="pb-4">
        WishList({likedProducts?.length ? likedProducts?.length : "0"})
      </h1>
      {isLoading ? (
        <div className="flex items-center justify-center flex-1">
          Loading...
        </div>
      ) : likedProducts ? (
        <div className="pb-10">
          <div className="grid xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {likedProducts?.map((product, index) => (
              <div key={index} className="flex flex-col">
                <div className="bg-gray-70 bg-opacity-[30%] flex flex-col  rounded-md justify-between flex-1">
                  <div className="w-full flex items-center justify-center overflow-hidden">
                    <img
                      src={`${api + "/" + product?.photos[0]}`}
                      className=" h-[150px] max-h-[150px] object-cover"
                      alt="img"
                    />
                  </div>
                  <button
                    onClick={() => handleOrderNowClick(product)}
                    className="bg-[#808080] flex w-full rounded-b-md p-[10px] justify-center gap-3 items-center"
                  >
                    <img src={deliver} alt="" />
                    <p className="text-white m-0 text-lg">Tumiza ubungubu</p>
                  </button>
                </div>
                <div className="flex justify-between flex-col my-2">
                  <div className="font-semibold text-sm mx-[10px]">
                    <ExpandableText maxChars={25}>
                      {product?.name}
                    </ExpandableText>
                  </div>
                  <div className="flex gap-2">
                    <p className="text-primary">
                      {displayNumbers(
                        product.priceAfterDiscount
                          ? product.priceAfterDiscount
                          : product.price
                      )}
                      frw
                    </p>
                    {product.priceAfterDiscount && (
                      <p className="text-gray-80 line-through">
                        {displayNumbers(product.price)}frw
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center flex-1">
          No liked Products so far
        </div>
      )}
      <div className="">
        <div className="flex justify-between">
          <SubHeading title="Just For You" />
          <Link
            className="bg-blue2 text-white py-[10px] px-[40px] rounded-md hover:bg-opacity-[80%] transition-all"
            to="/ibicuruzwa-byose"
          >
            Reba Byose
          </Link>
        </div>
        <ProductsList showProducts={4} />
      </div>
    </div>
  );
};

export default Likes;
