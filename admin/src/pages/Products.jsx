import React, { useEffect } from "react";
import { ProductsList, SubHeading } from "../components";
import { plus } from "../assets";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import useProductStore from "../store/productStore";
import { toast } from "react-toastify";

const Products = () => {
  const { fetchProducts, products } = useProductStore();
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const handleAuth = () => {
    if (!isAuthenticated) {
      navigate("/signup");
      toast.error("Please log in to access this page.");
    }
  };

  useEffect(() => {
    handleAuth();
    fetchProducts()
      .then(() => {
        // toast.success("Products fetched successfully!");
      })
      .catch((error) => {
        toast.error("Failed to fetch products.");
      });
  }, [navigate, isAuthenticated]);

  return (
    <div className="m-[50px] flex-1">
      <div className="flex justify-between flex-col gap-2 sm:flex-row">
        <SubHeading title="Recently added" />
        <Link to="/addProduct" className="flex items-center rounded-lg outline-none text-primary float-end font-lato font-medium text-[20px] hover:opacity-[80%]">
          Add Product <img src={plus} className="pl-2" alt="plus-icon" />
        </Link>
      </div>
      <ProductsList />
    </div>
  );
};

export default Products;
