import TournmentBlock from "../../components/tournmentBlock";
import Logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

export default function TournmentsPage() {
  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center flex-col gap-10 bg-gray-200">
      <div className="bg-neutra-branca p-8 rounded-lg shadow-md w-4/5 max-w-4xl text-center flex flex-col items-baseline gap-6">
        <div className="w-full flex justify-between ">
          <div className="flex items-center gap-2">
            <img src={Logo} alt="Imagem do logo" className="w-[10%] pb-5" />
            <div className="border-l border-neutra-pretaw-[10px] h-[50px] mb-4"></div>
            <h2 className="text-lg font-[energy]">Torneios</h2>
          </div>
        </div>
        <TournmentBlock
          Nome="Final"
          Time1="Time A"
          Time2="Time B"
          Pontuacao1={3}
          Pontuacao2={2}
        />
        <TournmentBlock
          Nome="Semifinal"
          Time1="Time C"
          Time2="Time D"
          Pontuacao1={1}
          Pontuacao2={0}
        />
        <div>
          <Link
            to={"/adm/modalidade"}
            className="bg-destaque border-1 text-neutra-branca py-2 px-4 rounded hover:bg-neutra-branca hover:text-destaque hover:border hover:border-destaque transition duration-300 cursor-pointer"
          >
            Voltar
          </Link>
        </div>
      </div>
    </div>
  );
}
