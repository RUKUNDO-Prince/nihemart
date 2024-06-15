import React, { useEffect, useRef, useState } from "react";
import { anonymous, draft, tick } from "../assets";
import { useNavigate } from "react-router-dom";
import { FaPlusCircle } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import useAuthStore from "../store/authStore";
import { Form, Formik } from "formik";
import { toast } from "react-toastify";
import useProductStore from "../store/productStore";

const Product = () => {
  const { addProduct, isLoading } = useProductStore();

  // image selection functionality
  const [images, setImages] = useState([]);
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
      if (!images.some((e) => e.name == files[i].name)) {
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

  console.log(filess);

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
      productSize,
      gender,
      productPrice,
      ProductInStock,
      ProductCategory,
      discountType,
      discount,
    } = values;

    // checking if the files have been selected
    if (filess.length > 0 && filess.length < 6) {
      await addProduct({
        productName,
        productDesc,
        productSize,
        gender,
        productPrice,
        ProductInStock,
        ProductCategory,
        discountType,
        discount,
        files: filess,
      });
    } else {
      toast.error("missing product images");
    }
  };
  return (
    <div>
      <Formik
        initialValues={{
          productName: "",
          productDesc: "",
          productSize: [],
          gender: [],
          productPrice: "",
          ProductInStock: "",
          ProductCategory: "",
          discountType: "",
          discount: "",
        }}
        onSubmit={(values) => handleProductSubmit(values)}
      >
        {({ handleSubmit, handleChange, setFieldValue, values }) => (
          <Form>
            <div className="flex-1 m-[30px] flex-col">
              <div>
                <div className="flex justify-between">
                  <button className="font-poppins font-semibold text-[16px] text-primary flex items-center gap-3">
                    <img src={anonymous} alt="icon" /> Add New Product
                  </button>
                  <div className="flex gap-5">
                    <button className="border-2 border-gray-90 text-black p-4 rounded-lg flex items-center hover:bg-gray-90 gap-3 h-12">
                      <img src={draft} alt="draft" />
                      Save Draft
                    </button>
                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="bg-blue2 text-white px-5 h-12 rounded-lg flex items-center hover:bg-blue3 gap-3"
                    >
                      <img src={tick} alt="tick" />
                      Add Product
                    </button>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between gap-5 my-4">
                    <div className="bg-gray-90 bg-opacity-[20%] w-[60%] p-5 rounded-lg">
                      <h1 className="font-lato font-bold text-[20px]">
                        General Information
                      </h1>
                      <div>
                        <div className="flex flex-col">
                          <label
                            htmlFor="productName"
                            className="font-lato font-medium text-[15px]"
                          >
                            Product Name
                          </label>
                          <input
                            name="productName"
                            className="font-poppins font-medium text-[15px] bg-gray-90 bg-opacity-[40%] p-2 h-10 rounded-md outline-none"
                            type="text"
                            placeholder="Enter Product name"
                            onChange={handleChange("productName")}
                          />
                        </div>
                        <div className="flex flex-col ">
                          <label
                            htmlFor="productDesc"
                            className="font-lato font-medium text-[15px]"
                          >
                            Product Description
                          </label>
                          <textarea
                            name="productDesc"
                            type="text"
                            onChange={handleChange("productDesc")}
                            className="font-poppins font-medium text-[15px] p-2 bg-gray-90 bg-opacity-[40%] h-[250px] outline-none rounded-lg"
                            placeholder="PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble free install & mess free removal Pressure sensitive."
                          ></textarea>
                        </div>
                      </div>
                      <div className="flex justify-between my-5 items-start">
                        <div className="w-[40%]">
                          <h1 className="font-semibold text-[20px]">Size</h1>
                          <p className="text-gray-50">Pick available sizes</p>
                          <ul className="relative flex gap-3">
                            <button
                              type="button"
                              onClick={() => {
                                const isSelected =
                                  values.productSize.includes("extra-small");
                                if (isSelected) {
                                  setFieldValue(
                                    "productSize",
                                    values.productSize.filter(
                                      (value) => value !== "extra-small"
                                    )
                                  );
                                } else {
                                  setFieldValue("productSize", [
                                    ...values.productSize,
                                    "extra-small",
                                  ]);
                                }
                              }}
                              className={` ${
                                values.productSize.includes("extra-small")
                                  ? "border-2 border-primary"
                                  : "border-2 border-transparent"
                              } relative w-[40px] h-[40px] flex justify-center items-center hover:bg-opacity-[70%] bg-gray-90 rounded-lg`}
                            >
                              XS
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                const isSelected =
                                  values.productSize.includes("medium");
                                if (isSelected) {
                                  setFieldValue(
                                    "productSize",
                                    values.productSize.filter(
                                      (value) => value !== "medium"
                                    )
                                  );
                                } else {
                                  setFieldValue("productSize", [
                                    ...values.productSize,
                                    "medium",
                                  ]);
                                }
                              }}
                              className={` ${
                                values.productSize.includes("medium")
                                  ? "border-2 border-primary"
                                  : "border-2 border-transparent"
                              } w-[40px] h-[40px] flex justify-center items-center hover:bg-opacity-[70%] bg-gray-90 rounded-lg`}
                            >
                              M
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                const isSelected =
                                  values.productSize.includes("small");
                                if (isSelected) {
                                  setFieldValue(
                                    "productSize",
                                    values.productSize.filter(
                                      (value) => value !== "small"
                                    )
                                  );
                                } else {
                                  setFieldValue("productSize", [
                                    ...values.productSize,
                                    "small",
                                  ]);
                                }
                              }}
                              className={` ${
                                values.productSize.includes("small")
                                  ? "border-2 border-primary"
                                  : "border-2 border-transparent"
                              } w-[40px] h-[40px] flex justify-center items-center hover:bg-opacity-[70%] bg-gray-90 rounded-lg`}
                            >
                              S
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                const isSelected =
                                  values.productSize.includes("large");
                                if (isSelected) {
                                  setFieldValue(
                                    "productSize",
                                    values.productSize.filter(
                                      (value) => value !== "large"
                                    )
                                  );
                                } else {
                                  setFieldValue("productSize", [
                                    ...values.productSize,
                                    "large",
                                  ]);
                                }
                              }}
                              className={` ${
                                values.productSize.includes("large")
                                  ? "border-2 border-primary"
                                  : "border-2 border-transparent"
                              } w-[40px] h-[40px] flex justify-center items-center hover:bg-opacity-[70%] bg-gray-90 rounded-lg`}
                            >
                              L
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                const isSelected =
                                  values.productSize.includes("extra-large");
                                if (isSelected) {
                                  setFieldValue(
                                    "productSize",
                                    values.productSize.filter(
                                      (value) => value !== "extra-large"
                                    )
                                  );
                                } else {
                                  setFieldValue("productSize", [
                                    ...values.productSize,
                                    "extra-large",
                                  ]);
                                }
                              }}
                              className={` ${
                                values.productSize.includes("extra-large")
                                  ? "border-2 border-primary"
                                  : "border-2 border-transparent"
                              } w-[40px] h-[40px] flex justify-center items-center hover:bg-opacity-[70%] bg-gray-90 rounded-lg`}
                            >
                              XL
                            </button>
                          </ul>
                        </div>
                        <div className="w-[40%]">
                          <h1 className="font-semibold text-[20px]">Gender</h1>
                          <p className="text-gray-50">Pick available gender</p>
                          <div className="flex my-2 gap-9">
                            <div className="flex gap-2">
                              <input
                                type="checkbox"
                                name="Men"
                                onChange={() => {
                                  const isSelected =
                                    values.gender.includes("Men");
                                  if (isSelected) {
                                    setFieldValue("gender", []);
                                  } else {
                                    setFieldValue("gender", ["Men"]);
                                  }
                                }}
                              />
                              <label>Men</label>
                            </div>
                            <div className="flex gap-2">
                              <input
                                type="checkbox"
                                name="Women"
                                onChange={() => {
                                  const isSelected =
                                    values.gender.includes("Women");
                                  if (isSelected) {
                                    setFieldValue("gender", []);
                                  } else {
                                    setFieldValue("gender", ["Women"]);
                                  }
                                }}
                              />
                              <label>Women</label>
                            </div>
                            <div className="flex gap-2">
                              <input
                                type="checkbox"
                                name="Unisex"
                                onChange={() => {
                                  const isSelected =
                                    values.gender.includes("unisex");
                                  if (isSelected) {
                                    setFieldValue("gender", []);
                                  } else {
                                    setFieldValue("gender", ["unisex"]);
                                  }
                                }}
                              />
                              <label>Unigender</label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-90 bg-opacity-[20%] w-[40%] p-5 rounded-lg">
                      <h1>Upload image</h1>
                      <div className="flex flex-col justify-center items-center">
                        {images && images.length !== 0 && (
                          <div className="w-full">
                            <img
                              src={images ? images[selectedImage]?.url : ""}
                              alt="selectedImage"
                              className="max-h-[336px] w-full object-contain"
                            />
                          </div>
                        )}
                        <div className="grid grid-rows-1 grid-cols-4 mt-10 gap-5">
                          {images &&
                            images.map((image, idx) => (
                              <div
                                key={idx}
                                className="h-full relative"
                                onClick={() => handleSelectedImage(idx)}
                                ref={selectedRef}
                              >
                                <span
                                  className=" font-semibold text-lg absolute -right-5 -top-5 m-2 bg-primary w-7 h-7 text-white text-center rounded-full cursor-pointer"
                                  onClick={() => removeImage(image.name)}
                                >
                                  &times;
                                </span>
                                <img
                                  className="w-[100px] h-[100px] object-cover"
                                  src={image.url}
                                  alt={image.name}
                                />
                              </div>
                            ))}
                          <input
                            type="file"
                            name="files"
                            ref={ImageRef}
                            onChange={onFileSelect}
                            className="hidden"
                            multiple
                          />
                          {images.length <= 4 ? (
                            <div
                              onClick={selectFiles}
                              className="border-4 border-dashed border-primary rounded-xl flex items-center justify-center bg-white w-[100px] h-[100px]"
                            >
                              <FaPlusCircle
                                size={24}
                                className="text-primary"
                              />
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between gap-5">
                <div className="bg-gray-90 bg-opacity-[20%] w-[60%] p-5 rounded-lg">
                  <h1 className="font-lato font-bold text-[20px]">
                    Pricing and Stock
                  </h1>
                  <div className="flex gap-5 my-2">
                    <div className="flex flex-col gap-1">
                      <label>Base Pricing</label>
                      <input
                        className="font-poppins font-medium text-[15px] bg-gray-90 bg-opacity-[40%] p-2 h-8 rounded-md outline-none"
                        type="text"
                        placeholder="Enter the base price"
                        onChange={handleChange("productPrice")}
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label>Stock</label>
                      <input
                        className="font-poppins font-medium text-[15px] bg-gray-90 bg-opacity-[40%] p-2 h-8 rounded-md outline-none"
                        type="number"
                        placeholder="Product In Stock"
                        onChange={handleChange("ProductInStock")}
                      />
                    </div>
                  </div>
                  <div className="flex gap-5 my-2">
                    <div className="flex flex-col gap-1">
                      <label>Discount</label>
                      <input
                        className="font-poppins font-medium text-[15px] bg-gray-90 bg-opacity-[40%] p-2 h-8 rounded-md outline-none"
                        type="text"
                        placeholder={`${discountType}`}
                        onChange={handleChange("discount")}
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label>Discount Type</label>
                      <select
                        onChange={(e) => {
                          setDiscountType(e.target.value);
                          console.log("here ", e.target.value);
                          setFieldValue("discountType", e.target.value);
                        }}
                        name="discountType"
                        className="font-poppins font-medium text-[15px] bg-gray-90 bg-opacity-[40%] p-1 h-8 rounded-md outline-none"
                      >
                        <option value="">discount Type</option>
                        <option value="percentage">Percentage</option>
                        <option value="amount">Amount</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-90 bg-opacity-[20%] w-[40%] p-5 rounded-lg">
                  <h1 className="font-lato font-bold text-[20px]">Category</h1>
                  <div className="my-2">
                    <p>Product category</p>
                    <select
                      name="ProductCategory"
                      onChange={handleChange("ProductCategory")}
                      className="font-poppins font-medium text-[15px] bg-gray-90 bg-opacity-[40%] p-2 h-10 rounded-md outline-none w-[50%]"
                    >
                      <option value="">choose the category</option>
                      <option value="home&lifestyle">Home & Lifestyle</option>
                      <option value="others">others</option>
                      <option value="others">others</option>
                      <option value="others">others</option>
                    </select>
                  </div>
                  <div className="my-2">
                    <p>Browse category</p>
                    <select
                      name=""
                      className="font-poppins font-medium text-[15px] bg-gray-90 bg-opacity-[40%] p-2 h-10 rounded-md outline-none w-[50%]"
                      id=""
                    >
                      <option value="">Jacket</option>
                      <option value="">others</option>
                      <option value="">others</option>
                      <option value="">others</option>
                    </select>
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
