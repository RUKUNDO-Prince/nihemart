import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useProductStore from "../store/productStore";
import { api } from "../config/axiosInstance";
import { toast } from "react-toastify";

const Product = () => {
  const [product, setProduct] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const { getProductById, deleteProduct, isLoading } = useProductStore();
  const params = useParams();
  const selectedProductId = params.id;
  const navigate = useNavigate();

  const returnSelectedProduct = async () => {
    const productData = await getProductById(selectedProductId);
    setProduct(productData);
    setSelectedImage(productData.photos[0]?.url);
  };

  useEffect(() => {
    returnSelectedProduct();
  }, [selectedProductId]);

  const handleDeleteProduct = async () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await deleteProduct(selectedProductId);
      navigate("/products");
      toast.success("Product deleted successfully");
    }
  };

  return (
    <div className="px-5 md:px-10 font-poppins">
      {isLoading ? (
        <div className="min-h-screen flex items-center justify-center text-lg">
          Loading...
        </div>
      ) : product !== null ? (
        <>
          <div>
            <p className="m-[20px] text-gray-90">
              / {product.category} /{" "}
              <span className="text-black">{product.name}</span>
            </p>
            <div className="flex flex-col lg:flex-row justify-between md:gap-5">
              <div className="flex lg:w-1/2 flex-col md:flex-row">
                <div className="md:min-w-[100px] w-full md:w-[15%] md:h-[560px] flex gap-5 flex-row md:flex-col justify-between md:justify-start my-[10px] overflow-x-auto no-scrollbar ">
                  {product?.photos?.map((photo, index) => (
                    <img
                      className={`bg-gray-90 bg-opacity-[30%] p-[20px] hover:bg-opacity-[20%] w-[150px] md:w-full ${
                        selectedImage === photo.url
                          ? "border-2 border-primary/50"
                          : "border-2"
                      } rounded-md`}
                      src={`${api}/uploads/images/${photo.url}`}
                      alt={`Product view ${index + 1}`}
                      key={index}
                      onClick={() => setSelectedImage(photo.url)}
                      loading="lazy"
                    />
                  ))}
                </div>
                <div className="bg-gray-90 bg-opacity-[30%] flex items-center justify-center content-center px-[40px] my-[10px] md:ml-[20px] hover:bg-opacity-[20%] w-full rounded-md overflow-hidden h-[91%]">
                  {selectedImage ? (
                    <img
                      src={`${api}/uploads/images/${selectedImage}`}
                      alt="Selected product view"
                      className="w-full md:min-w-[441px] max-h-[331px] object-contain"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      No Image Available
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-3 lg:w-1/2 px-5">
                <h1 className="md:text-[24px] text-[20px] font-semibold break-words whitespace-normal">{product.name}</h1>
                <p className="text-primary font-semibold md:text-[24px] flex items-center gap-3">
                  Price: {product.price} frw
                </p>
                <p className="text-primary font-semibold md:text-[24px] flex items-center gap-3">
                  Stock: {product.quantity}
                </p>
                <hr />
                <h2 className="text-lg font-semibold">Variations</h2>
                {product.variations?.map((variation, index) => (
                  <div key={index} className="border p-2 rounded">
                    <p>Variation: {variation.variation}</p>
                    <p>Price: {variation.price} frw</p>
                    <p>Stock: {variation.stock}</p>
                  </div>
                ))}
                <div className="flex gap-5">
                  <button
                    className="bg-blue3 px-5 py-2 rounded-md text-white hover:bg-blue2 transition-all duration-600"
                    onClick={() => navigate(`/updateProduct/${selectedProductId}`)}
                  >
                    Update Product
                  </button>
                  <button
                    className="bg-red-500 px-5 py-2 rounded-md text-white hover:bg-red-600 transition-all duration-600"
                    onClick={handleDeleteProduct}
                  >
                    Delete Product
                  </button>
                </div>
              </div>
            </div>
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
