import logo from "../../assets/logo.png";
import TeamBlock from "../../components/teamBlock";

export default function TeamManagement() {
  return (
    <div className="min-h-screen bg-[url('../../assets/AdmBG.png')] bg-center bg-cover flex items-center justify-center">
      <div className="bg-gray-100 rounded shadow-[0_0_30px_rgba(0,0,0,0.1)] p-12 w-full max-w-[1000px] flex flex-col items-center">
        <div className="flex items-center justify-center mb-12 -ml-[550px]">
          <img src={logo} alt="Logo" className="w-[80px]" />
          <div className="border-l border-[#001429] w-[10px] h-[60px] mx-4"></div>
          <h2 className="text-lg font-[energy]">Área do Administrador</h2>
        </div>

        <div className="w-full">
          <h1 className="text-2xl font-[energy] text-center text-[#001429] mb-8">
            Gerenciamento de Equipes
          </h1>
          <div className="grid gap-6 justify-center">
            <TeamBlock
              image={logo}
              alt={"Equipe A"}
              team={{
                nome: "Equipe A",
                capitão: "Capitão A",
                integrantes: ["Membro 1", "Membro 2"],
              }}
            />
            <TeamBlock
              image={logo}
              alt={"Equipe B"}
              team={{
                nome: "Equipe B",
                capitão: "Capitão B",
                integrantes: ["Membro 3", "Membro 4"],
              }}
            />
            <TeamBlock
              image={logo}
              alt={"Equipe C"}
              team={{
                nome: "Equipe C",
                capitão: "Capitão C",
                integrantes: ["Membro 5", "Membro 6"],
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
