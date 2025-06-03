import React from "react";
import Carousel from "../components/Carousel.jsx";
import Header from "../components/header.jsx";
import Footer from "../components/Footer.jsx";
import Banner from "../assets/bannerModalities.png";
import styles from "./ModalitiesPage.module.scss";

export default function Modalidades() {
  return (
    <div>
      <Header />
      <div className={styles.modalitiesBannerContainer}>
        <img
          src={Banner}
          alt="Garota fazendo ginastica artística"
          className={styles.modalitiesBanner}
        />
        <div className={styles.text}>
          <h1>
            Desafie-se
            <br />
            Conquiste
            <br />
            Celebre!
          </h1>
        </div>
      </div>
      <div className={styles.container_grid}>
        <h1 className={styles.title}>Modalidades</h1>
        <div className={styles.carousel_container}>
          <Carousel />
        </div>
      </div>
      <Footer />
    </div>
  );
}
