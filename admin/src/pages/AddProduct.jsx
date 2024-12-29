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
import { Switch } from '@headlessui/react';
import MDEditor from '@uiw/react-md-editor';

const productSchema = Yup.object({
  productName: Yup.string().required("please Enter the product name"),
  productDesc: Yup.string().required("please Enter the product description"),
  productPrice: Yup.string().required("please enter the product price"),
  ProductInStock: Yup.string().when(['hasVariations'], {
    is: (hasVariations) => !hasVariations,
    then: () => Yup.string().required("please enter the number of product in stock"),
    otherwise: () => Yup.string()
  }),
  ProductCategory: Yup.string().required("please enter the product category"),
  ProductSubCategory: Yup.string().required("please enter the product subcategory"),
});

const Product = () => {
  const [subcategories, setSubcategories] = useState([]);
  const [attributes, setAttributes] = useState([]);
  const [attributeName, setAttributeName] = useState("");
  const [attributeValues, setAttributeValues] = useState("");
  const [variations, setVariations] = useState([]);
  const [hasVariations, setHasVariations] = useState(false);
  const [defaultImageIndex, setDefaultImageIndex] = useState(0);
  const [variationWithImages, setVariationWithImages] = useState(false);

  // image selection functionality
  const [images, setImages] = useState([]);
  const [filess, setFiles] = useState([]);
  const ImageRef = useRef(null);

  const { addProduct, isLoading } = useProductStore();
  const navigate = useNavigate();

  const selectFiles = () => {
    ImageRef.current.click();
  };

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

  const removeImage = (name) => {
    setImages(images.filter((e) => e.name !== name));
    setFiles(filess.filter((e) => e.name !== name));
    if (defaultImageIndex >= images.length - 1) {
      setDefaultImageIndex(0);
    }
  };

  const handleVariationChange = (index, field, value) => {
    setVariations(prevVariations => {
      const newVariations = [...prevVariations];
      const variationName = generateVariations(attributes)[index];
      
      // Find existing variation or create new one
      const existingVariationIndex = newVariations.findIndex(v => v.variation === variationName);
      
      if (existingVariationIndex >= 0) {
        // Update existing variation
        newVariations[existingVariationIndex] = {
          ...newVariations[existingVariationIndex],
          [field]: field === 'stock' ? parseInt(value) : parseFloat(value)
        };
      } else {
        // Create new variation
        newVariations[index] = {
          variation: variationName,
          price: field === 'price' ? parseFloat(value) : 0,
          stock: field === 'stock' ? parseInt(value) : 0
        };
      }
      
      return newVariations;
    });
  };

  const handleVariationImageUpload = (variationIndex, file) => {
    if (!file) return;

    setVariations(prevVariations => {
      const newVariations = [...prevVariations];
      const variationName = generateVariations(attributes)[variationIndex];
      
      const existingVariationIndex = newVariations.findIndex(v => v.variation === variationName);
      
      if (existingVariationIndex >= 0) {
        newVariations[existingVariationIndex] = {
          ...newVariations[existingVariationIndex],
          image: file.name // Store just the filename
        };
      } else {
        newVariations[variationIndex] = {
          variation: variationName,
          price: 0,
          stock: 0,
          image: file.name // Store just the filename
        };
      }
      
      return newVariations;
    });

    // Add the file to the files array
    setFiles(prev => [...prev, file]);
  };

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
      
      // Reset variations when attributes change
      setVariations([]);
      setFieldValue("variations", []);
      
      setAttributeName("");
      setAttributeValues("");
    } else {
      toast.error("Please enter both name and values for the attribute.");
    }
  };

  const validateVariations = (variations, attributes) => {
    if (!variations || variations.length === 0) return false;
    
    const requiredCombinations = generateVariations(attributes);
    return requiredCombinations.every(combination => 
      variations.some(v => 
        v.variation === combination && 
        v.price > 0 && 
        v.stock >= 0
      )
    );
  };

  const handleProductSubmit = async (values) => {
    if (filess.length === 0) {
      toast.error("Please select at least one product image");
      return;
    }

    if (hasVariations && attributes.length === 0) {
      toast.error("Please add at least one attribute for variations");
      return;
    }

    if (hasVariations && !validateVariations(variations, attributes)) {
      toast.error("Please fill out all variation combinations with valid price and stock");
      return;
    }

    try {
      const formData = new FormData();
      
      // Add basic product info with proper type conversion
      formData.append("name", values.productName);
      formData.append("description", values.productDesc);
      formData.append("price", parseFloat(values.productPrice));
      formData.append("category", values.ProductCategory);
      formData.append("subCategory", values.ProductSubCategory);
      formData.append("hasVariations", hasVariations);
      formData.append("defaultImageIndex", defaultImageIndex);

      // Add variations and attributes if needed
      if (hasVariations) {
        // Ensure all variations have valid prices
        const validatedVariations = variations.map(v => ({
          ...v,
          price: parseFloat(v.price),
          stock: parseInt(v.stock) || 0
        }));
        
        formData.append("attributes", JSON.stringify(attributes));
        formData.append("variations", JSON.stringify(validatedVariations));
      } else {
        formData.append("quantity", parseInt(values.ProductInStock) || 0);
      }

      // Add discount if provided
      if (values.discountType && values.discount) {
        formData.append("discountType", values.discountType);
        formData.append("discount", parseFloat(values.discount) || 0);
      }

      // Add images
      filess.forEach(file => {
        formData.append("files", file);
      });

      await addProduct(formData);
      navigate("/products");
      
      // Show success toast only if not already active
      if (!toast.isActive("add-success")) {
        toast.success("Product added successfully!", { toastId: "add-success" });
      }
    } catch (error) {
      toast.error("Failed to add product. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      <Formik
        initialValues={{
          productName: "",
          productDesc: "",
          productPrice: "",
          ProductInStock: "",
          attributes: [],
          variations: [],
          ProductCategory: "",
          ProductSubCategory: "",
          discountType: "",
          discount: "",
          hasVariations: false,
        }}
        onSubmit={handleProductSubmit}
        validationSchema={productSchema}
      >
        {({ handleSubmit, handleChange, setFieldValue, values }) => (
          <Form encType="multipart/form-data">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div className="flex items-center gap-3">
                <img src={anonymous} alt="product" className="w-8 h-8" />
                <h1 className="text-xl md:text-2xl font-semibold">Add New Product</h1>
              </div>
              {/* <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 w-full sm:w-auto justify-center"
                >
                  <img src={draft} alt="draft" className="w-5 h-5" />
                  <span>Save Draft</span>
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 w-full sm:w-auto justify-center"
                >
                  <img src={tick} alt="publish" className="w-5 h-5" />
                  <span>Publish Product</span>
                </button>
              </div> */}
            </div>

            {/* Variations toggle */}
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
              <div className="flex items-center gap-3">
                <Switch
                  checked={hasVariations}
                  onChange={(checked) => {
                    setHasVariations(checked);
                    setFieldValue('hasVariations', checked);
                    if (!checked) {
                      setAttributes([]);
                      setVariations([]);
                      setFieldValue('attributes', []);
                      setFieldValue('variations', []);
                    }
                  }}
                  className={`${
                    hasVariations ? 'bg-primary' : 'bg-gray-200'
                  } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
                >
                  <span className="sr-only">Enable variations</span>
                  <span
                    className={`${
                      hasVariations ? 'translate-x-6' : 'translate-x-1'
                    } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                  />
                </Switch>
                <span className="font-medium">Enable Product Variations</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                {/* General Information */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h2 className="text-lg font-semibold mb-4">General Information</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block mb-1">Product Name</label>
                      <input
                        type="text"
                        name="productName"
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg"
                      />
                      <ErrorMessage
                        name="productName"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    <div>
                      <label className="block mb-1">Description</label>
                      <MDEditor
                        value={values.productDesc}
                        onChange={(value) => setFieldValue("productDesc", value)}
                        height={200}
                      />
                      <ErrorMessage
                        name="productDesc"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                  </div>
                </div>

                {/* Pricing and Stock */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h2 className="text-lg font-semibold mb-4">Pricing and Stock</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block mb-1">Base Price</label>
                      <input
                        type="number"
                        name="productPrice"
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg"
                      />
                      <ErrorMessage
                        name="productPrice"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    {!hasVariations && (
                      <div>
                        <label className="block mb-1">Stock Quantity</label>
                        <input
                          type="number"
                          name="ProductInStock"
                          onChange={handleChange}
                          className="w-full p-2 border rounded-lg"
                        />
                        <ErrorMessage
                          name="ProductInStock"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block mb-1">Discount Type</label>
                        <select
                          name="discountType"
                          onChange={handleChange}
                          className="w-full p-2 border rounded-lg"
                        >
                          <option value="">No Discount</option>
                          <option value="percentage">Percentage</option>
                          <option value="amount">Fixed Amount</option>
                        </select>
                      </div>

                      {values.discountType && (
                        <div>
                          <label className="block mb-1">Discount Value</label>
                          <input
                            type="number"
                            name="discount"
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg"
                            placeholder={values.discountType === 'percentage' ? 'Enter %' : 'Enter amount'}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Images Section */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h2 className="text-lg font-semibold mb-4">Product Images</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {images.map((image, idx) => (
                      <div 
                        key={idx} 
                        className={`relative aspect-square rounded-lg overflow-hidden cursor-pointer ${
                          idx === defaultImageIndex ? 'ring-2 ring-primary' : ''
                        }`}
                        onClick={() => setDefaultImageIndex(idx)}
                      >
                        <img 
                          src={image.url} 
                          alt={`Product ${idx}`}
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeImage(image.name);
                          }}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                        >
                          ×
                        </button>
                        {idx === defaultImageIndex && (
                          <span className="absolute bottom-0 left-0 right-0 bg-primary text-white text-xs py-1 text-center">
                            Default
                          </span>
                        )}
                      </div>
                    ))}
                    {images.length < 10 && (
                      <button
                        type="button"
                        onClick={selectFiles}
                        className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:border-primary transition-colors"
                      >
                        <FaPlusCircle className="text-gray-400 text-xl" />
                      </button>
                    )}
                  </div>
                  <input
                    type="file"
                    ref={ImageRef}
                    onChange={onFileSelect}
                    className="hidden"
                    multiple
                    accept="image/*"
                  />
                </div>

                {/* Categories */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h2 className="text-lg font-semibold mb-4">Categories</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block mb-1">Category</label>
                      <select
                        name="ProductCategory"
                        value={values.ProductCategory}
                        onChange={(e) => {
                          const selectedCategory = e.target.value;
                          handleChange(e);
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
                        className="w-full p-2 border rounded-lg"
                      >
                        <option value="">Select Category</option>
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
                      <label className="block mb-1">Subcategory</label>
                      <select
                        name="ProductSubCategory"
                        value={values.ProductSubCategory}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg"
                      >
                        <option value="">Select Subcategory</option>
                        {subcategories.map((subcategory, index) => (
                          <option key={index} value={subcategory}>
                            {subcategory}
                          </option>
                        ))}
                      </select>
                      <ErrorMessage
                        name="ProductSubCategory"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                  </div>
                </div>

                {/* Variations Section */}
                {hasVariations && (
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-semibold">Product Variations</h2>
                      <div className="flex items-center gap-2 ">
                        <Switch
                          checked={variationWithImages}
                          onChange={setVariationWithImages}
                          className={`${
                            variationWithImages ? 'bg-primary' : 'bg-gray-200'
                          } relative inline-flex h-6 w-11 items-center rounded-full`}
                        >
                          <span className="sr-only">Enable variation images</span>
                          <span
                            className={`${
                              variationWithImages ? 'translate-x-6' : 'translate-x-1'
                            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                          />
                        </Switch>
                        <span className="text-sm">Variation Images</span>
                      </div>
                    </div>

                    {/* Add attribute form */}
                    <div className="bg-gray-90 p-4 rounded-lg mb-6">
                      <h3 className="font-medium mb-3">Add New Attribute</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block mb-1 text-sm">Attribute Name</label>
                          <input
                            type="text"
                            value={attributeName}
                            onChange={(e) => setAttributeName(e.target.value)}
                            className="w-full p-2 border rounded-lg"
                            placeholder="e.g., Size, Color"
                          />
                        </div>
                        <div>
                          <label className="block mb-1 text-sm">Values (comma-separated)</label>
                          <input
                            type="text"
                            value={attributeValues}
                            onChange={(e) => setAttributeValues(e.target.value)}
                            className="w-full p-2 border rounded-lg"
                            placeholder="e.g., Small, Medium, Large"
                          />
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => addAttribute(setFieldValue)}
                        className="w-full sm:w-auto px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
                      >
                        Add Attribute
                      </button>
                    </div>

                    {/* Attributes list */}
                    {attributes.length > 0 && (
                      <div className="mb-6">
                        <h3 className="font-medium mb-3">Current Attributes</h3>
                        <div className="space-y-2">
                          {attributes.map((attr, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-gray-90 rounded-lg">
                              <div>
                                <span className="font-medium">{attr.name}:</span>{' '}
                                {attr.values.join(', ')}
                              </div>
                              <button
                                type="button"
                                onClick={() => {
                                  const newAttributes = attributes.filter((_, i) => i !== index);
                                  setAttributes(newAttributes);
                                  setFieldValue('attributes', newAttributes);
                                  setVariations([]);
                                  setFieldValue('variations', []);
                                }}
                                className="text-red-500 hover:text-red-700"
                              >
                                Remove
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Variations list */}
                    {attributes.length > 0 && (
                      <div>
                        <h3 className="font-medium mb-3">Variation Combinations</h3>
                        <div className="space-y-4">
                          {generateVariations(attributes).map((variation, index) => {
                            const currentVariation = variations.find(v => v.variation === variation);
                            const isComplete = currentVariation && 
                              currentVariation.price > 0 && 
                              currentVariation.stock >= 0;

                            return (
                              <div 
                                key={index} 
                                className={`p-4 border rounded-lg space-y-3 ${
                                  isComplete ? 'border-green-500' : 'border-gray-300'
                                }`}
                              >
                              <div className="font-medium text-primary">{variation}</div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                  <label className="block mb-1 text-sm">Price</label>
                                  <input
                                    type="number"
                                      value={currentVariation?.price || ''}
                                    onChange={(e) => handleVariationChange(index, 'price', e.target.value)}
                                    className="w-full p-2 border rounded-lg"
                                    placeholder="Variation price"
                                  />
                                </div>
                                <div>
                                  <label className="block mb-1 text-sm">Stock</label>
                                  <input
                                    type="number"
                                      value={currentVariation?.stock || ''}
                                    onChange={(e) => handleVariationChange(index, 'stock', e.target.value)}
                                    className="w-full p-2 border rounded-lg"
                                    placeholder="Stock quantity"
                                  />
                                </div>
                              </div>
                              {variationWithImages && (
                                <div>
                                  <label className="block mb-1 text-sm">Variation Image</label>
                                  <input
                                    type="file"
                                    onChange={(e) => handleVariationImageUpload(index, e.target.files[0])}
                                    accept="image/*"
                                    className="w-full"
                                  />
                                </div>
                              )}
                                {!isComplete && (
                                  <p className="text-yellow-600 text-sm">
                                    Please fill out both price and stock for this variation
                                  </p>
                                )}
                            </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Bottom action buttons */}
            <div className="mt-8 flex justify-end gap-4">
              <button
                type="button"
                onClick={() => navigate('/products')}
                className="px-6 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
              >
                {isLoading ? 'Adding Product...' : 'Add Product'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Product;
