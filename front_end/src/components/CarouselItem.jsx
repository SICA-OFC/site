import React from "react";

export default function CarouselItem({ image, alt, title }) {
  return (
    <div className="w-60 mx-4">
      <img
        src={image}
        alt={alt}
        className="w-full h-40 object-cover rounded-lg"
      />
      <div className="bg-orange-500 text-white text-center py-1 rounded-b-lg">
        {title}
      </div>
    </div>
  );
}
