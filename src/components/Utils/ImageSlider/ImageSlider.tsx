import { SetterFunction } from "@/interfaces";
import React, { FC, useState } from "react";

interface ImageSliderProps {
  images: string[];
  setOpenSlider: SetterFunction<boolean>;
}

const ImageSlider: FC<ImageSliderProps> = ({ images, setOpenSlider }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextSlide = () => {
    const newIndex =
      currentImageIndex >= images.length - 1 ? 0 : currentImageIndex + 1;
    setCurrentImageIndex(newIndex);
  };

  const prevSlide = () => {
    const newIndex =
      currentImageIndex <= 0 ? images.length - 1 : currentImageIndex - 1;
    setCurrentImageIndex(newIndex);
  };

  return (
    <div>
      <button onClick={() => setOpenSlider(false)}>x</button>
      <button onClick={prevSlide}>{"<"}</button>
      <img src={images[currentImageIndex]} alt="Slide" />
      <button onClick={nextSlide}>{">"} </button>
    </div>
  );
};

export default ImageSlider;
