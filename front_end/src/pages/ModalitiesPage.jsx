import React from "react";
import Carousel from "../components/Carousel.jsx";
import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";
import Banner from "../assets/bannerModalities.png";

export default function Modalidades() {
  return (
    <div>
      <Header />

      {/* Banner com imagem e texto sobreposto */}
      <div className="relative w-full">
        <img
          src={Banner}
          alt="Garota fazendo ginástica artística"
          className="w-full h-auto mt-[-90px]"
        />
        <div className="absolute top-[20%] left-[55%] text-[#f5f5f5]">
          <h1 className="text-[2.5rem] leading-tight">
            Desafie-se
            <br />
            Conquiste
            <br />
            Celebre!
          </h1>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="w-[80%] max-w-[1770px] mx-auto">
        <h1 className="my-[150px] text-center text-[2.5rem]">Modalidades</h1>
        <div className="mb-[150px]">
          <Carousel />
        </div>
      </div>

      <Footer />
    </div>
  );
}
