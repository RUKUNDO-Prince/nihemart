import React from "react";
import { Link } from "react-router-dom";
import { api } from "../config/axiosInstance";
import { displayNumbers } from "../utils/usableFuncs";

const ProductCard = ({ product }) => {
  // Get default image or first image
  const displayImage = product.photo || 
    (product.photos && product.photos.length > 0 ? 
      (product.photos.find(photo => photo.isDefault)?.url || 
       product.photos[0]?.url) : 
      null);

  // Calculate price range for variations
  const basePrice = product.price;
  const variationPrices = product.variations?.map(v => Number(v.price)) || [];
  const allPrices = [basePrice, ...variationPrices];
  const minPrice = Math.min(...allPrices);
  const maxPrice = Math.max(...allPrices);

  return (
    <div className="h-[37vh]">
      <div className="h-full flex flex-col">
        <div className="bg-opacity-[20%] justify-between items-start max-h-[206.38px] mb-[10px] flex-1 relative">
          <Link className="m-auto w-full h-full" to={`/igicuruzwa/${product._id}`}>
            {displayImage ? (
              <img
                src={`${api}/uploads/images/${displayImage}`}
                className="object-contain max-h-full w-full"
                alt={product.name}
                onError={(e) => {
                  console.log('Image failed to load:', displayImage);
                  e.target.onerror = null;
                  e.target.src = '/placeholder.png';
                }}
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                No Image
              </div>
            )}
          </Link>
        </div>
        <Link to={`/igicuruzwa/${product._id}`}>
          <h1 className="font-semibold line-clamp-2">{product.name}</h1>
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
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
