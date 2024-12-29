import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useProductStore from "../store/productStore";
import { api } from "../config/axiosInstance";
import { categories } from "../constants/data";
import { toast } from "react-toastify";

const UpdateProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: 0,
    quantity: 0,
    category: "",
    subCategory: "",
    attributes: [],
    variations: [],
    discountType: "",
    discount: 0,
    photos: [],
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [subcategories, setSubcategories] = useState([]);
  const { getProductById, updateProduct, isLoading } = useProductStore();
  const params = useParams();
  const selectedProductId = params.id;
  const navigate = useNavigate();

  const returnSelectedProduct = async () => {
    const productData = await getProductById(selectedProductId);
    setProduct(productData);
    setSelectedImage(productData.photos[0]?.url);
    const selectedCategoryObject = categories.find(
      (cat) => cat.category === productData.category
    );
    if (selectedCategoryObject) {
      setSubcategories(selectedCategoryObject.subcategories);
    }
  };

  useEffect(() => {
    returnSelectedProduct();
  }, [selectedProductId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleUpdateProduct = async () => {
    const formData = new FormData();
    // Append product data to formData
    Object.keys(product).forEach(key => {
      if (key === "photos") {
        product.photos.forEach(photo => {
          formData.append('files', photo); // Append each photo
        });
      } else if (key === "variations" || key === "attributes") {
        formData.append(key, JSON.stringify(product[key])); // Convert to JSON string
      } else {
        formData.append(key, product[key]);
      }
    });
    try {
      await updateProduct(selectedProductId, formData);
      navigate(`/product/${selectedProductId}`);
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product. Please try again.");
    }
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setProduct((prevProduct) => ({
      ...prevProduct,
      category: selectedCategory,
      subCategory: "",
    }));
    const selectedCategoryObject = categories.find(
      (cat) => cat.category === selectedCategory
    );
    if (selectedCategoryObject) {
      setSubcategories(selectedCategoryObject.subcategories);
    } else {
      setSubcategories([]);
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setProduct((prevProduct) => ({
      ...prevProduct,
      photos: [...prevProduct.photos, ...files], // Append new files to existing photos
    }));
  };

  const removeImage = (index) => {
    setProduct((prevProduct) => {
      const updatedPhotos = prevProduct.photos.filter((_, i) => i !== index);
      return { ...prevProduct, photos: updatedPhotos };
    });
    // Check if the removed image was the selected one
    if (selectedImage === product.photos[index]?.url) {
      setSelectedImage(null); // Reset selected image if removed
    }
  };

  const setDefaultImage = (url) => {
    setSelectedImage(url);
  };

  const handleCancel = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="px-5 md:px-10 font-poppins">
      {isLoading ? (
        <div className="min-h-screen flex items-center justify-center text-lg">
          Loading...
        </div>
      ) : (
        <div>
          <h1 className="text-2xl font-semibold">Update Product</h1>
          <div className="flex flex-col lg:flex-row justify-between md:gap-5">
            <div className="flex lg:w-1/2 flex-col md:flex-row">
              <div className="md:min-w-[100px] w-full md:w-[15%] md:h-[560px] flex gap-5 flex-row md:flex-col justify-between md:justify-start my-[10px] overflow-x-auto no-scrollbar">
                {product?.photos?.map((img, index) => (
                  <div key={index} className="relative">
                    <img
                      className={`bg-gray-90 bg-opacity-[30%] p-[20px] hover:bg-opacity-[20%] w-[150px] md:w-full ${
                        selectedImage === img.url
                          ? "border-2 border-primary/50"
                          : "border-2"
                      } rounded-md`}
                      src={img instanceof File ? URL.createObjectURL(img) : `${api}/uploads/images/${img.url}`} // Correctly construct the image URL
                      alt="img"
                      onClick={() => setDefaultImage(img.url)}
                    />
                    <button
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                      onClick={() => removeImage(index)}
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
              <div className="bg-gray-90 bg-opacity-[30%] flex items-center justify-center content-center px-[40px] my-[10px] md:ml-[20px] hover:bg-opacity-[20%] w-full rounded-md overflow-hidden h-[91%]">
                <img
                  src={`${api}/uploads/images/${selectedImage}`}
                  alt="item"
                  className="w-full md:min-w-[441px] max-h-[331px] object-contain"
                />
              </div>
            </div>
            <div className="flex flex-col gap-3 lg:w-1/2 px-5">
              <label>
                Update Images:
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="w-full px-2 py-1 border rounded"
                />
              </label>
              <label>
                Product Name:
                <input
                  type="text"
                  name="name"
                  value={product.name}
                  onChange={handleInputChange}
                  className="w-full px-2 py-1 border rounded"
                />
              </label>
              <label>
                Description:
                <textarea
                  name="description"
                  value={product.description}
                  onChange={handleInputChange}
                  className="w-full px-2 py-1 border rounded"
                />
              </label>
              <label>
                Price:
                <input
                  type="number"
                  name="price"
                  value={product.price}
                  onChange={handleInputChange}
                  className="w-full px-2 py-1 border rounded"
                />
              </label>
              <label>
                Quantity:
                <input
                  type="number"
                  name="quantity"
                  value={product.quantity}
                  onChange={handleInputChange}
                  className="w-full px-2 py-1 border rounded"
                />
              </label>
              <h2 className="text-lg font-semibold">Variations</h2>
              {product.variations.map((variation, index) => (
                <div key={index} className="border p-2 rounded">
                  <label>
                    Variation Name:
                    <input
                      type="text"
                      value={variation.variation}
                      onChange={(e) => {
                        const newVariations = [...product.variations];
                        newVariations[index].variation = e.target.value;
                        setProduct((prev) => ({
                          ...prev,
                          variations: newVariations,
                        }));
                      }}
                      className="w-full px-2 py-1 border rounded"
                    />
                  </label>
                  <label>
                    Price:
                    <input
                      type="number"
                      value={variation.price}
                      onChange={(e) => {
                        const newVariations = [...product.variations];
                        newVariations[index].price = parseFloat(e.target.value);
                        setProduct((prev) => ({
                          ...prev,
                          variations: newVariations,
                        }));
                      }}
                      className="w-full px-2 py-1 border rounded"
                    />
                  </label>
                  <label>
                    Stock:
                    <input
                      type="number"
                      value={variation.stock}
                      onChange={(e) => {
                        const newVariations = [...product.variations];
                        newVariations[index].stock = parseInt(e.target.value);
                        setProduct((prev) => ({
                          ...prev,
                          variations: newVariations,
                        }));
                      }}
                      className="w-full px-2 py-1 border rounded"
                    />
                  </label>
                </div>
              ))}
              <button
                className="bg-blue3 px-5 py-2 rounded-md text-white hover:bg-blue2 transition-all duration-600 mt-4"
                onClick={handleUpdateProduct}
              >
                Update Product
              </button>
              <button
                className="bg-gray-500 px-5 py-2 rounded-md text-white hover:bg-gray-400 transition-all duration-600 mt-4"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateProduct;