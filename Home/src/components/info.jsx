import Section from "./sectionInfo.jsx";
import "./css/section.css";
import image1 from "../../assets/Home/image1.png";
import image2 from "../../assets/Home/image2.png";
import image3 from "../../assets/Home/image3.png";

export default function Info() {
  return (
    <section>
      <p>Eu gosto de dar amor e carinho</p>

      <img src={image1} alt="Garota jogando Basquete" />
      <Section
        text={
          "O esporte é uma oportunidade de superação, onde cada treino e desafio impulsiona o crescimento. Ao se dedicar, você vence suas próprias barreiras, físicas e mentais. Vença seus limites e descubra a força que existe em você."
        }
      />
    </section>
  );
}
