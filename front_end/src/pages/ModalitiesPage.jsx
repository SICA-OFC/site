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
      <section
        className="bg-no-repeat bg-cover bg-top h-75 pb-5 md:pb-15 w-full text-center flex justify-center items-end"
        style={{ backgroundImage: `url(${Banner})` }}
      >
        <h1 className="text-[2.5rem] text-white ml-32 leading-tight font-[energy]">
          Desafie-se
          <br />
          Conquiste
          <br />
          Celebre!
        </h1>
      </section>

      {/* Conteúdo principal */}
      <div className="w-[80%] max-w-[1770px] mx-auto">
        <h1 className="my-[50px] text-center text-[2.5rem] font-[energy]">
          Modalidades
        </h1>
        <div className="mb-[50px]">
          <Carousel />
        </div>
      </div>

      <Footer />
    </div>
  );
}
