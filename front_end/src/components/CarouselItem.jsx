import React from "react";
import "./css/CorouselItem.css";
import { Link } from "react-router-dom";

export default function CarouselItem({ image, alt, title }) {
  return (
    <Link className="CarrouselItemLink">
      <div className="CarrouselItemDiv">
        <img
          src={image}
          alt={alt}
          className="w-full h-40 object-cover rounded-lg"
        />
        <div className="bg-orange-500 text-white text-center py-1 rounded-b-lg">
          <h2>{title}</h2>
        </div>
      </div>
    </Link>
  );
}
