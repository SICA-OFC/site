import React from "react";
import CarouselItem from "./CarouselItem.jsx";
import futebolImage from "../assets/ModalitySoccerImage.png";
import ComingSoon from "../assets/ComingSoon.png";

const items = [
  {
    image: futebolImage,
    alt: "Futebol",
    title: "Futebol",
  },
  {
    image: ComingSoon,
    alt: "Em breve",
    title: "-",
  },
  {
    image: ComingSoon,
    alt: "Em breve",
    title: "-",
  },
  {
    image: ComingSoon,
    alt: "Em breve",
    title: "-",
  },
  {
    image: ComingSoon,
    alt: "Em breve",
    title: "-",
  },
  {
    image: ComingSoon,
    alt: "Em breve",
    title: "-",
  },
];

export default function Carousel() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full h-full">
      {items.map((item, index) => (
        <CarouselItem key={index} {...item} />
      ))}
    </div>
  );
}
