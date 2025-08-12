import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import logo from "../../assets/logo.png";

export default function TournmentCreatorPage() {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/assets/AdmBG.png')" }} // ajuste o path se necessário
    >
      <div className="bg-[#f5f5f5] rounded shadow-[0_0_30px_rgba(0,0,0,0.1)] px-[10%] py-[3%] max-w-[1000px] w-full flex flex-col items-center">
        {/* Cabeçalho */}
        <div className="flex items-center justify-center mb-12 -ml-[550px]">
          <img src={logo} alt="Logo" className="w-[80px]" />
          <div className="border-l border-[#001429] w-[10px] h-[60px] mx-4"></div>
          <h2 className="text-lg font-semibold">Área do Administrador</h2>
        </div>

        {/* Formulário */}
        <form className="w-full">
          <div className="grid grid-cols-2 gap-5">
            {/* Nome do Torneio */}
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium">Nome do Torneio</label>
              <input
                type="text"
                className="p-2 border border-[#001429] rounded"
              />
            </div>

            {/* Modalidade */}
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium">Modalidade</label>
              <select className="p-2 border border-[#001429] rounded">
                <option>Selecione</option>
                <option>Futebol</option>
                <option>Vôlei</option>
              </select>
            </div>

            {/* Local */}
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium">Local</label>
              <select className="p-2 border border-[#001429] rounded">
                <option>Selecione</option>
                <option>Quadra 1</option>
                <option>Quadra 2</option>
              </select>
            </div>

            {/* Quantidade de Times */}
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium">Quantidade de Times</label>
              <input
                type="number"
                className="p-2 border border-[#001429] rounded"
              />
            </div>

            {/* Horário */}
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium">Horário</label>
              <input
                type="time"
                className="p-2 border border-[#001429] rounded"
              />
            </div>

            {/* Quantidade de Jogos */}
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium">Quantidade de Jogos</label>
              <input
                type="number"
                className="p-2 border border-[#001429] rounded"
              />
            </div>

            {/* Calendário */}
            <div className="col-span-2 mt-6 flex flex-col items-start">
              <label className="mb-2 font-medium text-sm">Selecione a Data:</label>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="dd/MM/yyyy"
                placeholderText="Clique para escolher uma data"
                className="p-2 border border-[#001429] rounded w-[250px]"
              />
            </div>
          </div>

          {/* Botões */}
          <div className="flex justify-center gap-5 mt-8">
            <button
              type="submit"
              className="bg-[#001429] text-white px-6 py-2 rounded-lg hover:bg-white hover:text-[#001429] border border-transparent hover:border-[#001429] transition"
            >
              Cadastrar Torneio
            </button>
            <button
              type="reset"
              className="bg-[#f18e2c] text-white px-6 py-2 rounded-lg hover:bg-white hover:text-[#f18e2c] border border-transparent hover:border-[#f18e2c] transition"
            >
              Limpar Campos
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
