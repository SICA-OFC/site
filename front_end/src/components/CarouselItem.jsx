import React from "react";
import { Link } from "react-router-dom";

export default function CarouselItem({ image, alt, title }) {
  return (
    <Link
      className="transition-transform duration-300 hover:scale-105 text-[#f5f5f5] no-underline"
      to="#"
    >
      <div className="flex flex-col justify-center items-center w-[400px] h-[270px] rounded-b-[5px] bg-[#DE6C3C] text-[#f5f5f5] m-[20px_50px]">
        <img
          src={image}
          alt={alt}
          className="w-full h-40 object-cover rounded-lg"
        />
        <div className="bg-orange-500 text-white text-center py-1 rounded-b-lg w-full">
          <h2 className="text-white">{title}</h2>
        </div>
      </div>
    </Link>
  );
}
