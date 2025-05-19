import React from "react";
import Carousel from "./Carousel";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Banner from "../components/Banner";
import styles from "../styles/Modalidades.module.css";

export default function Modalidades() {
  return (
    <div>
      <Header />
      <h1 className={styles.title} /*"text-4xl font-bold mb-4"*/>
        Modalidades
      </h1>

      <div className={styles.container_grid}>
        <img
          src="https://example.com/banner.jpg"
          alt="Banner Modalidades"
          className="w-full h-64 object-cover rounded-lg"
        />
        <div
          className={
            styles.text
          } /*"absolute text-white top-1/3 left-1/2 transform -translate-x-1/2 text-4xl font-bold text-center"*/
        >
          Desafie-se
          <br />
          Conquiste
          <br />
          Celebre!
        </div>
      </div>

      <Carousel />

      <Footer />
    </div>
  );
}
