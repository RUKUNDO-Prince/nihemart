import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Oval } from "react-loader-spinner";
import useProductStore from "../store/productStore";
import { useQuery } from "react-query";
import publicApi, { api } from "../config/axiosInstance";
import { displayNumbers } from "../utils/usableFuncs";
import { Link, useNavigate } from "react-router-dom";

const Search = ({ search = true }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const [popoverOpen, setPopoverOpen] = useState(false);

  useEffect(() => {
    if (search === false) setPopoverOpen(false);
  }, [search]);

  const {
    data: searchResults,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["search", searchQuery],
    queryFn: async () => {
      const response = await publicApi.get(
        `/product/search?searchQuery=${searchQuery}`
      );
      const products = response.data;
      return products;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: searchQuery.length > 0,
  });

  useEffect(() => {
    if (isLoading) {
      setPopoverOpen(true);
    } else if (searchResults?.length > 0) {
      setPopoverOpen(true);
    } else {
      // setPopoverOpen(false);
    }
  }, [isLoading, searchResults]);

  useEffect(() => {
    if (searchQuery.length === 0) {
      setTimeout(() => {
        setPopoverOpen(false);
      }, 1000);
    }
  }, [searchQuery]);

  const handleNavigate = ()=>{
    setTimeout(() => {
      setPopoverOpen(false);
    }, 200);
  }

  return (
    <div className="flex items-center justify-between bg-gray-default rounded-full border-gray-10 p-1 gap-2 relative">
      <div className="flex md:gap-5 pl-5 w-full">
        <input
          type="text"
          name="searchQuery"
          placeholder="shakisha ibicuruzwa"
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-transparent outline-none w-full text-gray-10 text-[16px] font-medium flex-1"
        />
        <button
          onClick={() => {
            setPopoverOpen((prev) => !prev);
          }}
        >
          <Icon
            icon={"material-symbols-light:search"}
            className="bg-primary rounded-full p-2"
            color="white"
            fontSize={40}
          />
        </button>
      </div>
      {/* search results */}
      <div
        className={`w-full xl:w-[600px] absolute xl:-right-36 top-10 mt-7 bg-gray-default border  max-h-[600px] overflow-y-scroll border-white/60 py-5 px-4 rounded-lg ${
          popoverOpen
            ? "-translate-y-0 opacity-100 scale-100"
            : "-translate-y-10 opacity-0 scale-0"
        } transition-all duration-150 z-10 origin-top`}
      >
        {isLoading ? (
          <div className="w-full flex justify-center items-center">
            <Oval
              visible={true}
              height="50"
              width="50"
              color="#FE8900"
              secondaryColor="rgb(217, 217,217,0.3)"
            />
          </div>
        ) : searchResults?.length > 0 ? (
          <div>
            {searchResults?.map((product, idx) => (
              <Link onClick={()=>handleNavigate()}
                to={`/igicuruzwa/${product._id}`}
                key={idx}
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex flex-col sm:flex-row gap-3 sm:items-center justify-between hover:bg-gray-200 hover:shadow-lg rounded-lg"
              >
                <div className="flex gap-5 items-center">
                  <div className="flex items-center justify-center w-[60px] min-w-[60px] min-h-[60px] rounded-full border border-primary">
                    <img
                      src={`${api + "/" + product?.photos[0]}`}
                      className=" w-full object-contain hover:scale-105 transition-all duration-75"
                      alt="img"
                    />
                  </div>
                  <div className="flex flex-col">
                    <div className="px-2 py-1 flex items-center justify-center bg-gray-20 rounded-xl w-fit">
                      <h2 className="text-xs leading-3 font-medium text-gray-default">
                        {product.category}
                      </h2>
                    </div>
                    <div className="flex mt-1">
                      <h2 className="text-sm text-black">{product.name}</h2>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col pl-20 sm:pl-0">
                  {product.quantity > 0 ? <h2 className="text-black"><span className="text-blueGradient">instock: </span>{product.quantity} items</h2> : <h2 className="text-red-600/90">Not available</h2>}
                  <h2 className="text-black">
                    price:{displayNumbers(product.price)} frw
                  </h2>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div>
            <div>no Results found</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
