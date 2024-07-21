import React, { useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { FaArrowRightLong } from "react-icons/fa6";

import { homeSlider } from "../constants/data";
import CarouselCard from "./CarouselCard";

const EmblaCarousel = (props) => {
  const { options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({ playOnInit: true, delay: 5000 }),
  ]);

  useEffect(() => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;
    const playOrStop = autoplay.play;
    playOrStop();
  }, [emblaApi]);

  return (
    <div className="embla h-full flex flex-col">
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
    </div>
  );
};

export default EmblaCarousel;
