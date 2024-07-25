import React, { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";

import { homeSlider } from "../constants/data";
import CarouselCard from "./CarouselCard";

const EmblaCarousel = (props) => {
  const { options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({ playOnInit: true, delay: 5000 }),
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;

    const handleSelect = () => setCurrentIndex(emblaApi.selectedScrollSnap());

    emblaApi.on("select", handleSelect);
    handleSelect(); // Set initial index

    return () => {
      emblaApi.off("select", handleSelect);
    };
  }, [emblaApi]);

  // Handlers for navigation buttons
  const scrollPrev = () => {
    if (emblaApi) emblaApi.scrollPrev();
  };

  const scrollNext = () => {
    if (emblaApi) emblaApi.scrollNext();
  };

  const goToSlide = (index) => {
    if (emblaApi) emblaApi.scrollTo(index);
  };

  return (
    <div className="embla h-full flex flex-col relative">
      <div className="embla__viewport flex-1" ref={emblaRef}>
        <div className="embla__container h-full">
          {homeSlider?.map((item, index) => (
            <div
              className="embla__slide bg-gradient-to-r from-blueGradient to-orangeGradient"
              key={index}
            >
              <CarouselCard
                priductIcon={item.icon}
                productImage={item.image}
                ProductName={item.name}
                heading={item.heading}
                link={"#"}
                desc={item.desc}
              />
            </div>
          ))}
        </div>
      </div>
      <button
        className="embla__button embla__button--prev absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full m-2"
        onClick={scrollPrev}
      >
        <FaArrowLeftLong />
      </button>
      <button
        className="embla__button embla__button--next absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full m-2"
        onClick={scrollNext}
      >
        <FaArrowRightLong />
      </button>
      <div className="embla__dots absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {homeSlider.map((_, index) => (
          <button
            key={index}
            className={`embla__dot w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-blue2" : "bg-gray-300"
            }`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default EmblaCarousel;
