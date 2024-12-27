import React from "react";
import { FaCaretUp, FaCaretDown } from "react-icons/fa";
import { api } from "../config/axiosInstance";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import { displayNumbers } from "../utils/usableFuncs";

const ProductCard = ({ product }) => {
  // Get default image or first image
  const displayImage = product.photo || 
    (product.photos && product.photos.length > 0 ? 
      (product.photos.find(photo => photo.isDefault)?.url || 
       product.photos[0].url) : 
      null);

  // Calculate price range for variations
  const basePrice = product.price;
  const variationPrices = product.variations?.map(v => Number(v.price)) || [];
  const allPrices = [basePrice, ...variationPrices];
  const minPrice = Math.min(...allPrices);
  const maxPrice = Math.max(...allPrices);

  // Calculate total stock
  const totalStock = product.hasVariations 
    ? product.variations.reduce((sum, v) => sum + (v.stock || 0), 0)
    : product.quantity;

  return (
    <div className="h-full">
      <div className="h-full flex flex-col justify-between">
        <div className="flex bg-blue2 bg-opacity-[20%] p-[20px] justify-between max-h-[206.38px] items-start mb-[10px] flex-1 relative">
          <Link to={`/product/${product._id}`} className="m-auto">
            {displayImage ? (
              <img
                src={`${api}/uploads/images/${displayImage}`}
                className="max-h-[150px] object-contain"
                alt={product.name}
                onError={(e) => {
                  console.log('Image failed to load:', displayImage);
                  e.target.onerror = null;
                  e.target.src = '/placeholder.png';
                }}
                loading="lazy"
              />
            ) : (
              <div className="w-[150px] h-[150px] bg-gray-200 flex items-center justify-center">
                No Image
              </div>
            )}
          </Link>
          <div className="absolute right-0 top-0 flex flex-col p-4 gap-2">
            <Link
              to={`/product/${product._id}`}
              className="p-2 rounded-full bg-white"
            >
              <Icon
                icon={"mdi:eye-outline"}
                className="w-4 h-4 lg:w-6 lg:h-6"
              />
            </Link>
          </div>
        </div>
        <div className="flex justify-between">
          <div>
            <h1 className="font-semibold">{product.name}</h1>
            <div className="flex gap-2">
              <p className="text-primary">
                {product.hasVariations ? (
                  <>
                    {displayNumbers(minPrice)} - {displayNumbers(maxPrice)} frw
                  </>
                ) : (
                  <>
                    {displayNumbers(product.priceAfterDiscount || product.price)} frw
                    {product.priceAfterDiscount && (
                      <span className="text-gray-90 line-through ml-2">
                        {displayNumbers(product.price)} frw
                      </span>
                    )}
                  </>
                )}
              </p>
            </div>
          </div>
          <div className="px-2 border border-gray-90 rounded-md flex justify-between items-center gap-2">
            <p>{totalStock}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
