import React from "react";
import CarouselItem from "./CarouselItem.jsx";
import futebolImage from "../assets/Futebas.png";
import ComingSoon from "../assets/ComingSoon.png";
import "./css/Carousel.css";

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
];

export default function Carousel() {
  return (
    <div className="CarouselDiv">
      {items.map((item, index) => (
        <CarouselItem key={index} {...item} />
      ))}
    </div>
  );
}
