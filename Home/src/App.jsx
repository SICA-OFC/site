import { useState } from "react";
import "./App.css";
import Header from "./components/header.jsx";
import bannerImage from "./assets/banner.png";
import image1 from "./assets/image1.png";
import image2 from "./assets/image2.png";
import image3 from "./assets/image3.png";
import Footer from "./components/footer.jsx";

function App() {
  return (
    <>
      <Header />

      <section className="banner">
        <div className="container-grid">
          <img src={bannerImage} alt="Pessoas jogando tênis" />
        </div>
      </section>

      <section id="info" className="container-grid">
        <img src={image1} alt="Garota jogando basquete" />
        <div className="info-text">
          <p>
            O esporte é uma oportunidade de superação, onde cada treino e
            desafio impulsiona o crescimento. Ao se dedicar, você vence suas
            próprias barreiras, físicas e mentais. Vença seus limites e descubra
            a força que existe em você.
          </p>
        </div>
      </section>

      <section id="about" className="container-grid">
        <div className="about-text">
          <p>
            O SICA (Sistema de Intercurso Acessível) é uma plataforma inovadora
            criada para simplificar o cadastro e a organização de eventos
            esportivos escolares
          </p>
        </div>
        <img src={image2} alt="Competição de natação" />
      </section>

      <section id="features" className="container-grid">
        <img src={image3} alt="Homem jogando" />
        <div className="features-text">
          <p>
            Permitindo cadastrar novos eventos de forma simples e rápida. É
            possível também fazer login facilmente. Os usuários podem visualizar
            todas as modalidades disponíveis no site. A plataforma foi
            desenvolvida para tornar o gerenciamento de eventos mais eficiente e
            acessível para todos.
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default App;
