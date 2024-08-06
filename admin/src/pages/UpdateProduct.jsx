import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useProductStore from "../store/productStore";
import { api } from "../config/axiosInstance";
import { toast } from "react-toastify";
import { categories } from "../constants/data";

const UpdateProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: 0,
    quantity: 0,
    category: '',
    subCategory: '',
    attributes: [],
    variations: [],
    discountType: '',
    discount: 0,
    photos: []
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
    setSelectedImage(productData.photos[0]);
    const selectedCategoryObject = categories.find(cat => cat.category === productData.category);
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
    await updateProduct(selectedProductId, product);
    navigate(`/product/${selectedProductId}`);
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setProduct((prevProduct) => ({
      ...prevProduct,
      category: selectedCategory,
      subCategory: ''
    }));
    const selectedCategoryObject = categories.find(cat => cat.category === selectedCategory);
    if (selectedCategoryObject) {
      setSubcategories(selectedCategoryObject.subcategories);
    } else {
      setSubcategories([]);
    }
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
              <div className="my-2">
                <p>Product category</p>
                <select
                  name="category"
                  value={product.category}
                  onChange={handleCategoryChange}
                  className="font-poppins font-medium text-[15px] bg-gray-90 bg-opacity-[40%] p-2 h-10 rounded-md outline-none w-[50%]"
                >
                  <option value="">Choose the category</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category.category}>
                      {category.category}
                    </option>
                  ))}
                </select>
              </div>
              <div className="my-2">
                <p>Product subcategory</p>
                <select
                  name="subCategory"
                  value={product.subCategory}
                  onChange={handleInputChange}
                  className="font-poppins font-medium text-[15px] bg-gray-90 bg-opacity-[40%] p-2 h-10 rounded-md outline-none w-[50%]"
                >
                  <option value="">Choose the subcategory</option>
                  {subcategories.map((subcategory, index) => (
                    <option key={index} value={subcategory}>
                      {subcategory}
                    </option>
                  ))}
                </select>
              </div>
              <button
                className="bg-blue3 px-5 py-2 rounded-md text-white hover:bg-blue2 transition-all duration-600 mt-4"
                onClick={handleUpdateProduct}
              >
                Update Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateProduct;
