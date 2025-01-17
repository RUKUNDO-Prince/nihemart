import React, { useEffect, useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { delivery, circle, cart } from "../assets";
import { ProductsList, SubHeading } from "../components";
import { useParams, useNavigate } from "react-router-dom";
import useProductStore from "../store/productStore";
import { api } from "../config/axiosInstance";
import { IoBagCheckOutline } from "react-icons/io5";
import useCartStore from "../store/cartStore";
import RelatedProductList from "../components/RelatedProductList";
import useOrderStore from "../store/OrderDetails";
import ReactMarkdown from "react-markdown";
import Comments from "../components/Comments";
import { useAuthStore } from '../store/authStore';
import toast from "react-hot-toast"

const Product = () => {
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const { getProductById, fetchProducts, isLoading } = useProductStore();
  const [currentPrice, setCurrentPrice] = useState(0);
  const [currentQuantity, setCurrentQuantity] = useState(0);
  const addToCart = useCartStore((state) => state.addToCart);
  const [selectedValues, setSelectedValues] = useState({});
  const { addProduct } = useOrderStore();
  const [currentStock, setCurrentStock] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const { user } = useAuthStore();

  const params = useParams();
  const selectedProductId = params.id;
  const navigate = useNavigate();

  const returnSelectedProduct = async () => {
    const productData = await getProductById(selectedProductId);
    setProduct(productData);
    setCurrentPrice(productData.priceAfterDiscount || productData.price);
    setCurrentStock(productData.quantity);

    // Safely find the default image or use the first available image
    const defaultImage =
      productData.photos?.find((p) => p.isDefault)?.url ||
      productData.photos?.[0]?.url;

    if (defaultImage) {
      setSelectedImage(defaultImage);
    } else {
      console.warn("No default or fallback image found for product.");
      setSelectedImage(null); // Or set a placeholder image URL
    }

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
    returnSelectedProduct();
    fetchProducts();
  }, [selectedProductId]);

  // Function to get the price and stock based on selected attribute values
  const getPriceAndStock = () => {
    if (!product) return;
  
    // If no variations, use base price, stock, and default image
    if (!product.variations || product.variations.length === 0) {
      setCurrentPrice(product.priceAfterDiscount || product.price);
      setCurrentStock(product.quantity);
      const defaultImage =
        product.photos?.find((p) => p.isDefault)?.url ||
        product.photos?.[0]?.url;
      setSelectedImage(defaultImage);
      return;
    }
  
    const selectedValuesArray = Object.values(selectedValues);
    if (selectedValuesArray.includes(null)) {
      setCurrentPrice(product.priceAfterDiscount || product.price);
      setCurrentStock(product.quantity);
      const defaultImage =
        product.photos?.find((p) => p.isDefault)?.url ||
        product.photos?.[0]?.url;
      setSelectedImage(defaultImage);
      return;
    }
  
    const variationString = selectedValuesArray.join(" ");
    const variation = product.variations?.find(
      (v) => v.variation === variationString
    );
  
    if (variation) {
      setCurrentPrice(variation.price);
      setCurrentStock(variation.stock);
  
      // Only change the image if the variation has an image
      if (variation.image) {
        setSelectedImage(variation.image); // Use variant image
      } else {
        const defaultImage =
          product.photos?.find((p) => p.isDefault)?.url ||
          product.photos?.[0]?.url;
        setSelectedImage(defaultImage); // Fall back to default image if no variant image
      }
    } else {
      const defaultImage =
        product.photos?.find((p) => p.isDefault)?.url ||
        product.photos?.[0]?.url;
      setSelectedImage(defaultImage); // Default image if no variation matches
    }
  };  

  // Update useEffect to use new function
  useEffect(() => {
    getPriceAndStock();
  }, [selectedValues, product]);

  // Function to handle attribute value changes
  const handleValueChange = (attrName, value) => {
    setSelectedValues((prevValues) => {
      const newValues = {
        ...prevValues,
        [attrName]: prevValues[attrName] === value ? null : value,
      };
  
      // Update the selected image based on the selected variant
      const selectedVariant = product.variations.find((variation) => {
        return Object.entries(newValues).every(([key, val]) => {
          return val === null || variation[key] === val;
        });
      });
  
      if (selectedVariant) {
        // Check if the selected variant has an image
        if (selectedVariant.image) {
          setSelectedImage(selectedVariant.image); // Set the selected image to the variant's image
        } else {
          // Fall back to default product image if no variant image is available
          const defaultImage =
            product.photos?.find((p) => p.isDefault)?.url ||
            product.photos?.[0]?.url;
          setSelectedImage(defaultImage);
        }
      } else {
        // Fallback to default product image if no variant is selected
        const defaultImage =
          product.photos?.find((p) => p.isDefault)?.url ||
          product.photos?.[0]?.url;
        setSelectedImage(defaultImage);
      }
  
      return newValues;
    });
  };  

  const handleOrderNowClick = () => {
    // Check if at least one variation is selected
    const selectedValuesArray = Object.values(selectedValues);
    if (selectedValuesArray.includes(null)) {
      toast.error(
        "Please select at least one variation before placing an order."
      );
      return;
    }

    const productDetails = {
      productId: product._id,
      name: product.name,
      price: currentPrice,
      quantity: quantity,
      variation: Object.values(selectedValues),
      directOrder: true,
    };
    addProduct(productDetails);
    navigate(
      `/tumiza/${selectedProductId}?quantity=${quantity}&category=${product.category}`
    );
  };

  const handleNavigateToHelp = () => {
    navigate("/ubufasha");
  };

  // Update the increment/decrement functions to use currentStock
  const incrementQuantity = () => {
    setQuantity((prev) => {
      if (prev < currentStock) {
        return prev + 1;
      }
      return prev;
    });
  };

  const decrementQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  const handleAddToCart = async () => {
    if (!user) {
      toast.error("Please login to add to cart");
      return;
    }
  
    // Get selected values array before validation
    const selectedValuesArray = product.hasVariations ? Object.values(selectedValues) : [];
    
    // Validate variations
    if (product.hasVariations && (!selectedValues || selectedValuesArray.some(value => !value))) {
      toast.error("Please select any variation");
      return;
    }
  
    try {
      setIsAddingToCart(true);
      await addToCart(product._id, quantity, selectedValuesArray);
      toast.success("Added to cart successfully!");
    } catch (error) {
      toast.error("Failed to add to cart. Please try again.");
      console.error("Add to cart error:", error);
    } finally {
      setIsAddingToCart(false);
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
            <div>
              <p className="m-[20px] text-gray-90">
                / {product.category} /{" "}
                <span className="text-black">{product.name}</span>
              </p>
              <div className="flex flex-col lg:flex-row justify-between md:gap-5">
                {/* images container */}
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
                    <img
                      src={
                        selectedImage
                          ? `${api}/uploads/images/${selectedImage}`
                          : `${api}/uploads/images/placeholder.jpg` // Use a placeholder image
                      }
                      alt={
                        selectedImage
                          ? "Selected product view"
                          : "Default product view"
                      }
                      className="w-full md:min-w-[441px] max-h-[331px] object-contain"
                      loading="lazy"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-3 lg:w-1/2">
                  <h1 className="md:text-[24px] text-[20px] font-semibold break-words whitespace-normal">
                    {product.name}
                  </h1>
                  <div className="flex gap-3 items-center">
                    {/* <p className="text-[#00FF66]">
                      {currentStock > 0
                        ? `${currentStock} muri stock`
                        : "dutegereje ibindi"}
                    </p> */}
                  </div>
                  <p className="text-primary font-semibold md:text-[24px] flex items-center gap-3">
                    {currentPrice} frw{" "}
                    {product.priceAfterDiscount && (
                      <span className="text-gray-90 line-through text-lg">
                        {product.price} frw
                      </span>
                    )}
                  </p>
                  <hr />
                  <div className="flex flex-col gap-2">
                    <h1 className="m-0 font-poppins">
                      Variations: (select more than one to see price variations)
                    </h1>
                    {product.attributes?.map((attr) => (
                      <div key={attr._id}>
                        <h2>{attr.name}:</h2>
                        {attr.values.map((value) => (
                          <button
                            key={value}
                            onClick={() => handleValueChange(attr.name, value)}
                            className={`mx-2 px-2 py-1 bg-gray-90 rounded-xl ${
                              selectedValues[attr.name] === value
                                ? "border border-primary"
                                : "border border-transparent"
                            }`}
                          >
                            {value}
                          </button>
                        ))}
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-5">
                    <div className="w-[100px] md:min-w-[150px] px-[5px] border-[1px] border-gray-90 rounded-md flex justify-between items-center">
                      <button
                        className="flex items-center gap-2 justify-between"
                        onClick={decrementQuantity}
                        disabled={quantity === 1}
                      >
                        <FaMinus
                          className={`cursor-pointer ${
                            quantity === 1 ? "opacity-50" : ""
                          }`}
                        />
                        <div className="h-[45px] w-[0.5px] bg-black"></div>
                      </button>
                      <p>{quantity}</p>
                      <button
                        className="flex items-center gap-2 justify-between"
                        onClick={incrementQuantity}
                        disabled={quantity === currentStock}
                      >
                        <div className="h-[45px] w-[0.5px] bg-black"></div>
                        <FaPlus
                          className={`cursor-pointer ${
                            quantity === currentStock ? "opacity-50" : ""
                          }`}
                        />
                      </button>
                    </div>
                    <button
                      onClick={handleAddToCart}
                      className="bg-primary px-2 py-[10px] rounded-md hover:bg-opacity-[60%] transition-all duration-600 text-white flex justify-between items-center md:text-[16px] text-[14px]"
                    >
                      <img src={cart} alt="" />
                      Shyira mu gatebo
                    </button>
                  </div>
                  <div className="border-[2px] border-gray-80 rounded-lg  my-5">
                    <div className="m-[20px] flex justify-between">
                      <div className="">
                        <img src={delivery} alt="icon" />
                        <div>
                          <p className="hidden md:block">
                            Niba ukunze iki gicuruzwa ukaba ushaka kugitumiza
                            kanda aha →
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
                    <div className="m-[20px] hidden md:block">
                      <img src={circle} alt="icon" />
                      <div>
                        <h1>Igihe wasubizwa amafaranga</h1>
                        <p className="flex flex-col">
                          Iyo ugize ikibazo kuri order yawe utubwira mbere
                          y'amasaha 24 tukayagusubiza ukishyura transport.{" "}
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
          <div className="my-2">
            <h1 className="font-semibold font-poppins md:text-2xl text-xl">
              Ubusobanuro bw'igicuruzwa
            </h1>
            <ReactMarkdown className="text-black text-[16px] md:text-lg text-base leading-relaxed md:leading-loose mt-2 md:mt-4 break-words whitespace-normal">
              {product.description}
            </ReactMarkdown>
          </div>
          <div className="my-[20px]">
            <SubHeading title="Ibindi byerekeranye" />
            <RelatedProductList
              categoryFilter={product.category}
              productId={product._id}
              showProducts={4}
            />
          </div>
          <Comments productId={product._id} />
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
