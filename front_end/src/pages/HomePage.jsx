import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";
import image1 from "../assets/Homeimage1.png";
import image2 from "../assets/Homeimage2.png";
import image3 from "../assets/Homeimage3.png";

export default function HomePage() {
  return (
    <>
      <Header />
      <div className="flex flex-col justify-center items-center gap-10 mb-10 md:gap-20 md:mb-20">
        <section className="bg-[url(/src/assets/bannerHome.png)] bg-no-repeat bg-cover h-40 pb-5 md:h-70 md:pb-15 w-screen text-center flex justify-center items-end ">
          <h1 className="text-white text-3xl md:text-6xl font-[Energy]">
            SICA: O mundo é dos OUSADOS!
          </h1>
        </section>

        <section className="bg-secundaria text-white flex flex-col md:flex-row justify-center items-center w-[90%] md:w-[80%]">
          <img src={image1} alt="Garota jogando basquete" className="w-full md:w-[70%]" />
          <p className="p-5 font-sans">
            O esporte é uma oportunidade de superação, onde cada treino e
            desafio impulsiona o crescimento. Ao se dedicar, você vence suas
            próprias barreiras, físicas e mentais. Vença seus limites e descubra
            a força que existe em você.
          </p>
        </section>

        <section className="bg-primaria text-white flex flex-col md:flex-row justify-center items-center w-[90%] md:w-[80%]">
          <p className="p-5 font-sans">
            O SICA (Sistema de Intercurso Acessível) é uma plataforma inovadora
            criada para simplificar o cadastro e a organização de eventos
            esportivos escolares.
          </p>
          <img src={image2} alt="Competição de natação" className="w-full md:w-[70%]" />
        </section>

        <section className="bg-secundaria text-white flex flex-col md:flex-row justify-center items-center w-[90%] md:w-[80%]">
          <img src={image3} alt="Competição de natação" className="w-full md:w-[70%]" />
          <p className="p-5 font-sans">
            Permitindo cadastrar novos eventos de forma simples e rápida. Os usuários podem visualizar
            todas as modalidades disponíveis no site. A plataforma foi
            desenvolvida para tornar o gerenciamento de eventos mais eficiente e
            acessível para todos.
          </p>
        </section>
      </div>
      <Footer />
    </>
  );
}
