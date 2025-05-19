import React from "react";
import CarouselItem from "./CarouselItem";

const items = [
  {
    image: "https://example.com/basquete.jpg",
    alt: "Basquete",
    title: "Basquete",
  },
  {
    image: "https://example.com/futebol.jpg",
    alt: "Futebol",
    title: "Futebol",
  },
  {
    image: "https://example.com/xadrez.jpg",
    alt: "Xadrez",
    title: "Xadrez",
  },
  {
    image: "https://example.com/volei.jpg",
    alt: "Voleibol",
    title: "Voleibol",
  },
];

export default function Carousel() {
  return (
    <div className="flex justify-center items-center space-x-4 overflow-x-auto p-4">
      {items.map((item, index) => (
        <CarouselItem key={index} {...item} />
      ))}
    </div>
  );
}
