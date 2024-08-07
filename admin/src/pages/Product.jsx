import React, { useEffect, useState } from "react";
import { ProductsList, SubHeading } from "../components";
import { useParams, useNavigate } from "react-router-dom";
import useProductStore from "../store/productStore";
import { api } from "../config/axiosInstance";

const Product = () => {
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const {
    getProductById,
    fetchProducts,
    deleteProduct,
    isLoading,
  } = useProductStore();
  const [currentPrice, setCurrentPrice] = useState(0);
  const [selectedValues, setSelectedValues] = useState({});

  const params = useParams();
  const selectedProductId = params.id;
  const navigate = useNavigate();

  const returnSelectedProduct = async () => {
    const productData = await getProductById(selectedProductId);
    setProduct(productData);
    setCurrentPrice(
      productData.priceAfterDiscount
        ? productData.priceAfterDiscount
        : productData.price
    );
    setSelectedImage(productData.photos[0]);

    const initialSelectedValues = productData.attributes?.reduce(
      (acc, attr) => {
        acc[attr.name] = null;
        return acc;
      },
      {}
    );
    setSelectedValues(initialSelectedValues);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    returnSelectedProduct();
    fetchProducts();
  }, [selectedProductId]);

  const getPrice = () => {
    if (!product) return "";
    const selectedValuesArray = Object.values(selectedValues);
    if (selectedValuesArray.includes(null)) {
      setCurrentPrice(
        product.priceAfterDiscount ? product.priceAfterDiscount : product.price
      );
    }
    const variationString = selectedValuesArray.join(" ");
    const variation = product.variations?.find(
      (v) => v.variation === variationString
    );
    setCurrentPrice(
      variation
        ? variation.price
        : product.priceAfterDiscount
        ? product.priceAfterDiscount
        : product.price
    );
  };

  useEffect(() => {
    getPrice();
  }, [selectedValues]);

  const handleValueChange = (attrName, value) => {
    setSelectedValues((prevValues) => ({
      ...prevValues,
      [attrName]: prevValues[attrName] === value ? null : value,
    }));
  };

  const handleDeleteProduct = async () => {
    await deleteProduct(selectedProductId);
    navigate("/products");
  };

  return (
    <div className=" px-5 md:px-10 font-poppins">
      {isLoading ? (
        <div className="min-h-screen flex items-center justify-center text-lg">
          Loading...
        </div>
      ) : product !== null ? (
        <>
          <div>
            <div>
              <p className="m-[20px] text-gray-90">
                / {product.category} /{" "}
                <span className="text-black">{product.name}</span>
              </p>
              <div className="flex flex-col lg:flex-row justify-between md:gap-5">
                <div className="flex lg:w-1/2 flex-col md:flex-row">
                  <div className=" md:min-w-[100px] w-full md:w-[15%] md:h-[560px] flex gap-5 flex-row md:flex-col justify-between md:justify-start my-[10px] overflow-x-auto no-scrollbar ">
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
                  <div className="bg-gray-90 bg-opacity-[30%] flex items-center justify-center content-center px-[40px] my-[10px]  md:ml-[20px] hover:bg-opacity-[20%] w-full rounded-md overflow-hidden h-[91%]">
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
                    <p className="text-[#00FF66]">
                      {product.quantity
                        ? ` ${product.quantity} muri stock`
                        : "dutegereje ibindi"}
                    </p>
                  </div>
                  <p className="text-primary font-semibold text-[24px] flex items-center gap-3">
                    {currentPrice} frw{" "}
                    {product.priceAfterDiscount && (
                      <span className="text-gray-90 line-through text-lg">
                        {product.price} frw
                      </span>
                    )}
                  </p>
                  <hr />
                  <div className="border-[2px] border-gray-80 rounded-lg p-4 flex items-start justify-end gap-5">
                    <button
                      className="bg-blue3 px-5 py-2 md:px-[30px] md:py-[10px] rounded-md text-white hover:bg-blue2 transition-all duration-600"
                      onClick={() => navigate(`/updateProduct/${selectedProductId}`)}
                    >
                      Update Product
                    </button>
                    <button
                      className="bg-primary hover:bg-opacity-[60%] transition-all duration-600 px-5 py-2 md:px-[30px] md:py-[10px] rounded-md text-white"
                      onClick={handleDeleteProduct}
                    >
                      Delete Product
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="my-2">
            <h1 className="font-semibold font-poppins text-2xl">
              Ubusobanuro bw'igicuruzwa
            </h1>
            <p className="text-black text-[16px]">{product.description}</p>
          </div>
          <div className="my-[20px]">
            <SubHeading title="Ibindi byerekeranye" />
            <ProductsList
              categoryFilter={product.category}
              productId={product._id}
              showProducts={4}
            />
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center">
          <h2>Loading...</h2>
        </div>
      )}
    </div>
  );
};

export default Product;
