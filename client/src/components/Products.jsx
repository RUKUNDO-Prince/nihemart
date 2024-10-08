import React from "react";
import SubHeading from "./SubHeading";
import Heading from "./Heading";
import { Link } from "react-router-dom";
import ProductsList from "./ProductsList";
import { useTranslation } from "react-i18next";

const Products = () => {
  const { t } = useTranslation();

  return (
    <div className=" p-5 md:p-[50px]">
      <SubHeading title={t('products')} />
      <div className="flex justify-between items-center">
        <Heading title={t('month')} />
        <Link to="/ibicuruzwa-byose" className="bg-blue3 px-5 py-2 md:px-[30px] md:py-[10px] rounded-md text-white hover:bg-blue2">{t('view')}</Link>
      </div>
      <ProductsList maxProducts={12}/>
    </div>
  );
};

export default Products;
