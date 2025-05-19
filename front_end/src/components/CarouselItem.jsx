import React from "react";
import "./css/CorouselItem.css";

export default function CarouselItem({ image, alt, title }) {
  return (
    <div className="CarrouselItemDiv">
      <img
        src={image}
        alt={alt}
        className="w-full h-40 object-cover rounded-lg"
      />
      <div className="bg-orange-500 text-white text-center py-1 rounded-b-lg">
        <h5>{title}</h5>
      </div>
    </div>
  );
}
