import React from "react";
import SubHeading from "./SubHeading";
import Heading from "./Heading";
import { Link } from "react-router-dom";
import ProductsList from "./ProductsList";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode, Autoplay } from 'swiper/modules';
import ProductCard from "./ProductCard";
import useProductStore from "../store/productStore";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Import additional Swiper styles
import 'swiper/css/navigation';

const Products = () => {
  const { t } = useTranslation();
  const products = useProductStore((state) => state.products);

  return (
    <div className="p-5 md:p-[50px]">
      <SubHeading title={t('products')} />
      <div className="flex justify-between items-center">
        <Heading title={t('month')} />
        <Link 
          to="/ibicuruzwa-byose" 
          className="bg-blue3 px-5 py-2 md:px-[30px] md:py-[10px] rounded-md text-white hover:bg-blue2"
        >
          {t('view')}
        </Link>
      </div>

      {/* Mobile view with slider */}
      <div className="md:hidden relative group">
        <Swiper
          slidesPerView={1.2}
          spaceBetween={20}
          freeMode={true}
          navigation={{
            prevEl: '.swiper-button-prev',
            nextEl: '.swiper-button-next',
          }}
          autoplay={{
            delay: 1000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
          }}
          modules={[FreeMode, Navigation, Autoplay]}
          className="w-full"
        >
          {products.slice(0, 6).map((product) => (
            <SwiperSlide key={product._id}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons */}
        <button className="swiper-button-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <FaChevronLeft className="text-primary" />
        </button>
        <button className="swiper-button-next absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <FaChevronRight className="text-primary" />
        </button>
      </div>

      {/* Desktop view */}
      <div className="hidden md:block">
        <ProductsList maxProducts={6}/>
      </div>
    </div>
  );
};

export default Products;
