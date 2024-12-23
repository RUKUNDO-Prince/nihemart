import React, { useState, useRef } from "react";
import { anonymous, draft, tick } from "../assets";
import { useNavigate } from "react-router-dom";
import { FaPlusCircle } from "react-icons/fa";
import useAuthStore from "../store/authStore";
import { ErrorMessage, Form, Formik } from "formik";
import { toast } from "react-toastify";
import useProductStore from "../store/productStore";
import * as Yup from "yup";
import { categories } from "../constants/data";
import { generateVariations } from "../utils/generateVariations";

const productSizeSchema = Yup.object().shape({
  size: Yup.string().required("Size is required"),
  price: Yup.number().positive("Price must be a positive number"),
});

const productSchema = Yup.object({
  productName: Yup.string().required("please Enter the product name"),
  productDesc: Yup.string().required("please Enter the product description"),
  productPrice: Yup.string().when('variations', {
    is: (variations) => !variations || variations.length === 0,
    then: Yup.string().required("please enter the product price"),
    otherwise: Yup.string()
  }),
  ProductInStock: Yup.string().when('variations', {
    is: (variations) => !variations || variations.length === 0,
    then: Yup.string().required("please enter the number of product in stock"),
    otherwise: Yup.string()
  }),
  ProductCategory: Yup.string().required("please enter the product category"),
  discountType: Yup.string(),
  discount: Yup.string(),
  variations: Yup.array().of(
    Yup.object().shape({
      variation: Yup.string().required("Variation name is required"),
      price: Yup.number()
        .typeError("Price must be a number")
        .required("Price is required for variation")
        .positive("Price must be positive"),
      stock: Yup.number()
        .typeError("Stock must be a number")
        .required("Stock is required for variation")
        .min(0, "Stock cannot be negative")
    })
  )
});

const Product = () => {
  const [subcategories, setSubcategories] = useState([]);
  const [attributes, setAttributes] = useState([]);
  const [attributeName, setAttributeName] = useState("");
  const [attributeValues, setAttributeValues] = useState("");
  const [attributePrices, setAttributePrices] = useState([]);

  const { addProduct, isLoading } = useProductStore();

  // image selection functionality
  const [images, setImages] = useState([]);
  const [allowVariations, setAllowVariations] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [filess, setFiles] = useState([]);
  const [discountType, setDiscountType] = useState("percentage");
  const ImageRef = useRef(null);
  const selectedRef = useRef(null);

  const selectFiles = () => {
    ImageRef.current.click();
  };

  const handleSelectedImage = (idx) => {
    setSelectedImage(idx);
  };

  // selecting files
  const onFileSelect = (e) => {
    const files = e.target.files;
    if (files.length === 0) return;
    for (let i = 0; i < files.length; i++) {
      if (files[i].type.split("/")[0] !== "image") continue;
      if (!images.some((e) => e.name === files[i].name)) {
        setImages((prevImages) => [
          ...prevImages,
          {
            name: files[i].name,
            url: URL.createObjectURL(files[i]),
          },
        ]);
        setFiles((prevFiles) => [...prevFiles, files[i]]);
      }
    }
  };

  // removing images
  const removeImage = (name) => {
    setImages(images.filter((e) => e.name !== name));
    setFiles(filess.filter((e) => e.name !== name));
  };

  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const handleProductSubmit = async (values) => {
    const {
      productName,
      productDesc,
      attributes,
      variations,
      productPrice,
      ProductInStock,
      ProductCategory,
      ProductSubCategory,
      discountType,
      discount,
    } = values;
    // checking if the files have been selected
    if (filess.length > 0 && filess.length <= 10) {
      await addProduct({
        productName,
        productDesc,
        attributes,
        variations,
        productPrice,
        ProductInStock,
        ProductCategory,
        ProductSubCategory,
        discountType,
        discount,
        files: filess,
      });
    } else {
      toast.error("missing product images");
    }
  };

  // Handle adding new attribute
  const addAttribute = (setFieldValue) => {
    if (attributeName && attributeValues) {
      const valuesArray = attributeValues
        .split(",")
        .map((value) => value.trim());
      
      const newAttributes = [
        ...attributes,
        { name: attributeName, values: valuesArray },
      ];
      
      setAttributes(newAttributes);
      setFieldValue("attributes", newAttributes);
      
      // Generate new variations based on updated attributes
      const newVariations = generateVariations(newAttributes).map(variation => ({
        variation,
        price: "",
        stock: 0
      }));
      setFieldValue("variations", newVariations);
      
      setAttributeName("");
      setAttributeValues("");
    } else {
      toast.error("Please enter both name and values for the attribute.");
    }
  };
  return (
    <div>
      <Formik
        initialValues={{
          productName: "",
          productDesc: "",
          productPrice: "",
          ProductInStock: "",
          attributes: [],
          variations: [],
          ProductCategory: "",
          discountType: "",
          discount: "",
          ProductSubCategory: "",
        }}
        onSubmit={(values) => {
          console.log(values);
          handleProductSubmit(values);
        }}
        validationSchema={productSchema}
      >
        {({ handleSubmit, handleChange, setFieldValue, values }) => (
          <Form encType="multipart/form-data">
            <div className="max-w-7xl mx-auto p-4 md:p-6">
              {/* Header Section */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                <h1 className="flex items-center gap-2 text-primary font-semibold text-xl mb-4 md:mb-0">
                  <img src={anonymous} alt="icon" className="w-6 h-6" />
                  Add New Product
                </h1>
                
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="flex items-center justify-center gap-2 px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all duration-300 shadow-sm"
                >
                  <img src={tick} alt="tick" className="w-5 h-5" />
                  Add Product
                </button>
              </div>

              {/* Variation Toggle */}
              <div className="mb-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="noVariation"
                    onChange={() => setAllowVariations((prev) => !prev)}
                    checked={allowVariations}
                    className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span className="text-gray-700">Allow Variation</span>
                </label>
              </div>

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* General Information Section */}
                <div className="lg:col-span-2 bg-gray-90/20 rounded-xl p-6">
                  <h2 className="text-xl font-bold mb-6">General Information</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Product Name</label>
                      <input
                        name="productName"
                        className="w-full p-3 rounded-lg bg-gray-90/40 focus:outline-none focus:ring-2 focus:ring-primary/50"
                        type="text"
                        placeholder="Enter Product name"
                        onChange={handleChange("productName")}
                      />
                      <ErrorMessage
                        name="productName"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Product Description</label>
                      <textarea
                        name="productDesc"
                        onChange={handleChange("productDesc")}
                        className="w-full p-3 rounded-lg bg-gray-90/40 focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[200px]"
                        placeholder="Enter product description..."
                      />
                      <ErrorMessage
                        name="productDesc"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    {/* Attributes Section */}
                    <div className="mt-6">
                      <h3 className="font-semibold mb-4">Attributes</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">Name</label>
                          <input
                            type="text"
                            value={attributeName}
                            onChange={(e) => setAttributeName(e.target.value)}
                            className="w-full p-3 rounded-lg bg-gray-90/40 focus:outline-none focus:ring-2 focus:ring-primary/50"
                            placeholder="Attribute name"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium mb-1">Values (comma-separated)</label>
                          <input
                            type="text"
                            value={attributeValues}
                            onChange={(e) => setAttributeValues(e.target.value)}
                            className="w-full p-3 rounded-lg bg-gray-90/40 focus:outline-none focus:ring-2 focus:ring-primary/50"
                            placeholder="Value 1, Value 2, Value 3..."
                          />
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => addAttribute(setFieldValue)}
                        className="mt-3 px-4 py-2 bg-blue3 text-white rounded-lg hover:bg-blue2 transition-colors"
                      >
                        Add Attribute
                      </button>

                      {/* Attribute List */}
                      <div className="mt-4 space-y-2">
                        {attributes.map((attr, idx) => (
                          <div key={idx} className="p-3 bg-white rounded-lg shadow-sm flex justify-between items-center group hover:bg-gray-50 transition-colors">
                            <div>
                              <span className="font-medium">{attr.name}:</span>{" "}
                              <div className="flex flex-wrap gap-2 mt-2">
                                {attr.values.map((value, valueIdx) => (
                                  <div key={valueIdx} className="flex items-center bg-gray-100 px-3 py-1 rounded-full group/value">
                                    {value}
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const newValues = attr.values.filter((_, i) => i !== valueIdx);
                                        const newAttributes = [...attributes];
                                        newAttributes[idx].values = newValues;
                                        
                                        if (newValues.length === 0) {
                                          newAttributes.splice(idx, 1);
                                        }
                                        
                                        setAttributes(newAttributes);
                                        setFieldValue('attributes', newAttributes);
                                        
                                        const newVariations = generateVariations(newAttributes).map(variation => ({
                                          variation,
                                          price: "",
                                          stock: 0
                                        }));
                                        setFieldValue('variations', newVariations);
                                      }}
                                      className="ml-2 text-gray-400 hover:text-red-500 opacity-0 group-hover/value:opacity-100 transition-opacity"
                                    >
                                      ×
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                const newAttributes = attributes.filter((_, index) => index !== idx);
                                setAttributes(newAttributes);
                                setFieldValue('attributes', newAttributes);
                                
                                const newVariations = generateVariations(newAttributes).map(variation => ({
                                  variation,
                                  price: "",
                                  stock: 0
                                }));
                                setFieldValue('variations', newVariations);
                              }}
                              className="p-2 text-red-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Image Upload Section */}
                <div className="bg-gray-90/20 rounded-xl p-6">
                  <h2 className="text-xl font-bold mb-6">Upload Images</h2>
                  
                  {/* Main Image Display */}
                  {images && images.length > 0 && (
                    <div className="mb-6">
                      <img
                        src={images[selectedImage]?.url || images[0]?.url}
                        alt="Selected product"
                        className="w-full h-64 object-contain bg-white rounded-lg"
                      />
                    </div>
                  )}

                  {/* Thumbnail Grid */}
                  <div className="grid grid-cols-4 gap-3">
                    {images.map((image, idx) => (
                      <div
                        key={idx}
                        className={`relative rounded-lg border-2 ${
                          images[selectedImage]?.url === image.url
                            ? "border-primary"
                            : "border-gray-200"
                        } cursor-pointer group`}
                        onClick={() => handleSelectedImage(idx)}
                      >
                        <button
                          className="absolute -right-2 -top-2 w-6 h-6 bg-primary text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeImage(image.name);
                          }}
                        >
                          ×
                        </button>
                        <img
                          className="w-full h-24 object-contain p-2"
                          src={image.url}
                          alt={image.name}
                        />
                      </div>
                    ))}
                    
                    {images.length <= 9 && (
                      <button
                        onClick={selectFiles}
                        className="border-2 border-primary border-dashed rounded-lg flex items-center justify-center h-24 hover:bg-primary/5 transition-colors"
                      >
                        <FaPlusCircle className="text-primary text-2xl" />
                      </button>
                    )}
                  </div>
                  <input
                    type="file"
                    ref={ImageRef}
                    onChange={onFileSelect}
                    className="hidden"
                    multiple
                  />
                </div>

                {/* Pricing and Stock Section */}
                <div className="lg:col-span-2 bg-gray-90/20 rounded-xl p-6">
                  <h2 className="text-xl font-bold mb-6">Pricing and Stock</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Base Price and Stock */}
                    <div>
                      {!values.attributes?.length && (
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium mb-1">Base Price</label>
                            <input
                              type="number"
                              placeholder="Enter base price"
                              onChange={handleChange("productPrice")}
                              className="w-full p-3 rounded-lg bg-gray-90/40 focus:outline-none focus:ring-2 focus:ring-primary/50"
                            />
                            <ErrorMessage
                              name="productPrice"
                              component="div"
                              className="text-red-500 text-sm mt-1"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium mb-1">Stock</label>
                            <input
                              type="number"
                              placeholder="Enter stock quantity"
                              onChange={handleChange("ProductInStock")}
                              className="w-full p-3 rounded-lg bg-gray-90/40 focus:outline-none focus:ring-2 focus:ring-primary/50"
                            />
                            <ErrorMessage
                              name="ProductInStock"
                              component="div"
                              className="text-red-500 text-sm mt-1"
                            />
                          </div>
                        </div>
                      )}

                      {/* Discount Section */}
                      <div className="space-y-4 mt-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">Discount</label>
                          <input
                            type="text"
                            placeholder={discountType}
                            onChange={handleChange("discount")}
                            className="w-full p-3 rounded-lg bg-gray-90/40 focus:outline-none focus:ring-2 focus:ring-primary/50"
                          />
                          <ErrorMessage
                            name="discount"
                            component="div"
                            className="text-red-500 text-sm mt-1"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-1">Discount Type</label>
                          <select
                            onChange={(e) => {
                              setDiscountType(e.target.value);
                              setFieldValue("discountType", e.target.value);
                            }}
                            className="w-full p-3 rounded-lg bg-gray-90/40 focus:outline-none focus:ring-2 focus:ring-primary/50"
                          >
                            <option value="">Select discount type</option>
                            <option value="percentage">Percentage</option>
                            <option value="amount">Amount</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Variations Grid */}
                    <div>
                      <h3 className="font-semibold mb-4">Variations</h3>
                      <div className="space-y-3">
                        {generateVariations(values.attributes).map((variation, index) => (
                          <div 
                            key={index} 
                            className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm group hover:bg-gray-50 transition-all duration-300"
                          >
                            <span className="font-medium min-w-[120px] text-gray-700">{variation}</span>
                            <div className="flex gap-3 flex-1">
                              <div className="flex-1">
                                <input
                                  type="number"
                                  placeholder="Price"
                                  value={values.variations[index]?.price || ''}
                                  onChange={(e) =>
                                    setFieldValue(`variations[${index}]`, {
                                      ...values.variations[index],
                                      variation,
                                      price: e.target.value,
                                    })
                                  }
                                  className="w-full p-2.5 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                                />
                              </div>
                              <div className="flex-1">
                                <input
                                  type="number"
                                  placeholder="Stock"
                                  value={values.variations[index]?.stock || ''}
                                  onChange={(e) =>
                                    setFieldValue(`variations[${index}]`, {
                                      ...values.variations[index],
                                      variation,
                                      stock: parseInt(e.target.value) || 0,
                                    })
                                  }
                                  className="w-full p-2.5 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                                />
                              </div>
                              <button
                                type="button"
                                onClick={() => {
                                  const newVariations = [...values.variations];
                                  newVariations.splice(index, 1);
                                  setFieldValue('variations', newVariations);
                                }}
                                className="p-2 text-red-500 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-50"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Category Section */}
                <div className="bg-gray-90/20 rounded-xl p-6">
                  <h2 className="text-xl font-bold mb-6">Category</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Product Category</label>
                      <select
                        name="ProductCategory"
                        value={values.ProductCategory}
                        onChange={(e) => {
                          const selectedCategory = e.target.value;
                          setFieldValue("ProductCategory", selectedCategory);
                          const selectedCategoryObject = categories.find(
                            (cat) => cat.category === selectedCategory
                          );
                          if (selectedCategoryObject) {
                            setSubcategories(selectedCategoryObject.subcategories);
                            setFieldValue("ProductSubCategory", "");
                          } else {
                            setSubcategories([]);
                          }
                        }}
                        className="w-full p-3 rounded-lg bg-gray-90/40 focus:outline-none focus:ring-2 focus:ring-primary/50"
                      >
                        <option value="">Choose category</option>
                        {categories.map((category, index) => (
                          <option key={index} value={category.category}>
                            {category.category}
                          </option>
                        ))}
                      </select>
                      <ErrorMessage
                        name="ProductCategory"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Subcategory</label>
                      <select
                        name="ProductSubcategory"
                        value={values.ProductSubCategory}
                        onChange={handleChange("ProductSubCategory")}
                        className="w-full p-3 rounded-lg bg-gray-90/40 focus:outline-none focus:ring-2 focus:ring-primary/50"
                      >
                        <option value="">Choose subcategory</option>
                        {subcategories.map((subcategory, index) => (
                          <option key={index} value={subcategory}>
                            {subcategory}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Product;
