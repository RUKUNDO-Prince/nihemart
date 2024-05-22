import React from "react";
import { homeSlider } from "../constants/data";
import EmblaCarousel from "./EmblaCarousel";
import "../embla.css";

const OPTIONS = { loop: true }
const SLIDE_COUNT = 5
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

const Hero = () => {
  return (
    <div className=" w-full lg:w-[80%] min-h-[350px]">
      <EmblaCarousel slides={homeSlider} options={OPTIONS} />
    </div>
  );
};

export default Hero;
