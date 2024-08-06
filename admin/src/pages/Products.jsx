import React, { useEffect } from "react";
import SubHeading from "../components/SubHeading";
import { ProductsList } from "../components";
import { plus } from "../assets";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import useProductStore from "../store/productStore";

const Products = () => {
  const {fetchProducts,products} = useProductStore()
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const handleAuth = () => {
    if (!isAuthenticated) {
      navigate("/signup");
    }
  };
  useEffect(() => {
    handleAuth();
    fetchProducts();
  }, [navigate, isAuthenticated]);
  console.log(products);
  return (
    <div className="m-[50px] flex-1">
      <div className="flex justify-between flex-col gap-2 sm:flex-row">
        <SubHeading title="Recently added" />
        <Link to="/addProduct" className="flex items-center rounded-lg outline-none text-primary float-end font-lato font-medium text-[20px] hover:opacity-[80%]">
          Add Product <img src={plus} className="pl-2" alt="plus-icon" />
        </Link>
      </div>
      <ProductsList />
      {products?.length !==0 && <button className="flex items-center bg-blue3 py-3 px-8 rounded-lg outline-none text-white my-0 float-end hover:bg-blue2">
        View More
      </button>}
    </div>
  );
};

export default Products;
