import styles from "./HomePage.module.scss";
import Header from "../components/header.jsx";
import bannerImage from "../assets/banner.png";
import image1 from "../assets/image1.png";
import image2 from "../assets/image2.png";
import image3 from "../assets/image3.png";
import Footer from "../components/footer.jsx";

export default function HomePage() {
  return (
    <div className={styles.container_home}>
      <Header />

      <section className={styles.banner}>
        <div className={styles.container_grid}>
          <img src={bannerImage} alt="Pessoas jogando tênis" />
        </div>
      </section>

      <section id={styles.info} className={styles.container_grid}>
        <img src={image1} alt="Garota jogando basquete" />
        <div className={styles.info_text}>
          <p>
            O esporte é uma oportunidade de superação, onde cada treino e
            desafio impulsiona o crescimento. Ao se dedicar, você vence suas
            próprias barreiras, físicas e mentais. Vença seus limites e descubra
            a força que existe em você.
          </p>
        </div>
      </section>

      <section id={styles.about} className={styles.container_grid}>
        <div className={styles.about_text}>
          <p>
            O SICA (Sistema de Intercurso Acessível) é uma plataforma inovadora
            criada para simplificar o cadastro e a organização de eventos
            esportivos escolares
          </p>
        </div>
        <img src={image2} alt="Competição de natação" />
      </section>

      <section id={styles.features} className={styles.container_grid}>
        <img src={image3} alt="Homem jogando" />
        <div className={styles.features_text}>
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
    </div>
  );
}
