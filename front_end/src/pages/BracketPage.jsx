import { useEffect, useRef } from "react";
import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";
import BracketUp from "../components/blockUp.jsx";
import BracketDown from "../components/blockDown.jsx";
import BracketEnd from "../components/blockEnd.jsx";
import logo from "../assets/logo.png";
import randoms from "../assets/Profile.svg";

export default function BracketPage() {
  const containerRef = useRef(null);

  useEffect(() => {
    const stages = containerRef.current
      ? containerRef.current.querySelectorAll(".bracket-division")
      : [];
    const quantity = stages.length;
    const maxWidth = quantity * 200 + 220;
    if (containerRef.current) {
      containerRef.current.style.maxWidth = `${maxWidth}px`;
    }
  }, []);

  return (
    <div>
      <Header />
      <section className="min-h-[746px]">
        <div
          className="w-4/5 max-w-[1770px] mx-auto py-10 flex flex-row justify-evenly pt-80.25 pb-80.25"
          ref={containerRef}
        >
          <div className="bracket-division flex flex-col justify-around h-[250px]">
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
          <div className="bracket-division flex flex-col justify-around h-[250px]">
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
