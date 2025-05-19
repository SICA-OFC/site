import { useEffect, useRef } from "react";
import styles from "./BracketPage.module.scss";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import BracketUp from "../components/blockUp.jsx";
import BracketDown from "../components/blockDown.jsx";
import BracketEnd from "../components/blockEnd.jsx";
import logo from "../assets/logo.png";
import randoms from "../assets/user-solid.svg";

export default function BracketPage() {
  //Na teoria, esse comando serve para pegar o tamanho do container e fazer com que ele se ajuste a quantidade de times
  //Na prática, não sei se funciona, mas o código está aqui :D
  const containerRef = useRef(null);

  useEffect(() => {
    const stages = containerRef.current
      ? containerRef.current.querySelectorAll(`.${styles.bracketDivision}`)
      : [];
    const quantity = stages.length;
    const MaxWidth = quantity * 200 + 220;
    if (containerRef.current) {
      containerRef.current.style.maxWidth = `${MaxWidth}px`;
    }
  }, []);

  return (
    <div>
      <Header />
      <section className={styles.section}>
        <div className={styles.container_grid} ref={containerRef}>
          <div className={styles.bracketDivision}>
            <BracketUp
              href1="#"
              teamLogo1={logo}
              teamName1="SICA"
              href2="#"
              teamLogo2={randoms}
              teamName2="Randoms"
              color1="orange"
              color2="darkBlue"
            />
            <BracketDown
              href1="#"
              teamLogo1={logo}
              teamName1="SICA"
              href2="#"
              teamLogo2={randoms}
              teamName2="Randoms"
              color1="darkBlue"
              color2="orange"
            />
          </div>
          <div className={styles.bracketDivision}>
            <BracketEnd
              href1="#"
              teamLogo1={logo}
              teamName1="SICA"
              href2="#"
              teamLogo2={randoms}
              teamName2="Randoms"
              color1="orange"
              color2="darkBlue"
            />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
