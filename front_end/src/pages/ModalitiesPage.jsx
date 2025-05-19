import React from "react";
import Carousel from "../components/Carousel.jsx";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Banner from "../assets/bannerModalities.png";
import styles from "./ModalitiesPage.module.scss";

export default function Modalidades() {
  return (
    <div>
      <Header />
      <div className={styles.container_grid}>
        <div className={styles.modalitiesBannerContainer}>
          <img
            src={Banner}
            alt="Garota fazendo ginastica artística"
            className={
              styles.modalitiesBanner
            } /*"w-full h-64 object-cover rounded-lg"*/
          />
          <div
            className={
              styles.text
            } /*"absolute text-white top-1/3 left-1/2 transform -translate-x-1/2 text-4xl font-bold text-center"*/
          >
            <h2>
              Desafie-se
              <br />
              Conquiste
              <br />
              Celebre!
            </h2>
          </div>
        </div>
        <h1 className={styles.title} /*"text-4xl font-bold mb-4"*/>
          Modalidades
        </h1>
      </div>
      <div className={styles.carousel_container}>
        <Carousel />
      </div>
      <Footer />
    </div>
  );
}
