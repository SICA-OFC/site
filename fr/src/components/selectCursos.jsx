import { useState, useEffect } from "react";

const cursos = [
  { id: 1, sigla: "1AM", nome: "Administração M-tec", periodo: "1" },
  { id: 2, sigla: "2AM", nome: "Administração M-tec", periodo: "1" },
  { id: 3, sigla: "3AM", nome: "Administração M-tec", periodo: "1" },
  { id: 4, sigla: "1BM", nome: "Mecânica M-tec", periodo: "1" },
  { id: 5, sigla: "2BM", nome: "Mecânica M-tec", periodo: "1" },
  { id: 6, sigla: "3BM", nome: "Mecânica M-tec", periodo: "1" },
  { id: 7, sigla: "1DM", nome: "Eletrônica M-tec", periodo: "1" },
  { id: 8, sigla: "3DM", nome: "Eletrônica M-tec", periodo: "1" },
  { id: 9, sigla: "1EM", nome: "Desenvolvimento de Sistemas M-tec", periodo: "1" },
  { id: 10, sigla: "2EM", nome: "Desenvolvimento de Sistemas M-tec", periodo: "1" },
  { id: 11, sigla: "3EM", nome: "Desenvolvimento de Sistemas M-tec", periodo: "1" },
  { id: 12, sigla: "1FM", nome: "Mecatrônica M-tec", periodo: "1" },
  { id: 13, sigla: "2FM", nome: "Mecatrônica M-tec", periodo: "1" },
  { id: 14, sigla: "3FM", nome: "Mecatrônica M-tec", periodo: "1" },
  { id: 15, sigla: "1AT", nome: "Administração M-tec", periodo: "2" },
  { id: 16, sigla: "2AT", nome: "Administração M-tec", periodo: "2" },
  { id: 17, sigla: "3AT", nome: "Administração M-tec", periodo: "2" },
  { id: 18, sigla: "1CT", nome: "Automação M-tec", periodo: "2" },
  { id: 19, sigla: "2CT", nome: "Automação M-tec", periodo: "2" },
  { id: 20, sigla: "3CT", nome: "Automação M-tec", periodo: "2" },
  { id: 21, sigla: "1FT", nome: "Mecatrônica M-tec", periodo: "2" },
  { id: 22, sigla: "2FT", nome: "Mecatrônica M-tec", periodo: "2" },
  { id: 23, sigla: "3FT", nome: "Mecatrônica M-tec", periodo: "2" },
  { id: 24, sigla: "1GT", nome: "Desenvolvimento de Sistemas Ptech", periodo: "2" },
  { id: 25, sigla: "2GT", nome: "Desenvolvimento de Sistemas Ptech", periodo: "2" },
  { id: 26, sigla: "3GT", nome: "Desenvolvimento de Sistemas Ptech", periodo: "2" },
  { id: 27, sigla: "1HT", nome: "Informática M-tec", periodo: "2" },
  { id: 28, sigla: "2HT", nome: "Informática M-tec", periodo: "2" },
  { id: 29, sigla: "3HT", nome: "Informática M-tec", periodo: "2" },
  { id: 30, sigla: "1BN", nome: "Mecânica M-tec N", periodo: "3" },
  { id: 31, sigla: "1DN", nome: "Eletrônica M-tec N", periodo: "3" },
  { id: 32, sigla: "2DN", nome: "Eletrônica M-tec N", periodo: "3" },
  { id: 33, sigla: "1FN", nome: "Automação M-tec N", periodo: "3" },
];

export default function SelectCursos({ periodo, curso, onPeriodoChange, onCursoChange }) {
  const [cursosFiltrados, setCursosFiltrados] = useState([]);

  useEffect(() => {
    if (periodo) {
      const filtrados = cursos.filter((c) => c.periodo === periodo);
      setCursosFiltrados(filtrados);
    }
  }, [onCursoChange, periodo]);
  return (
    <>
      <div className="flex gap-2">
        {["1", "2", "3"].map((p, i) => {
          const labelText = ["Manhã", "Tarde", "Noite"][i];
          return (
            <label key={p} className="flex items-center gap-1 cursor-pointer r">
              <input
                type="radio"
                name="periodo"
                value={p}
                checked={periodo === p}
                onChange={(e) => onPeriodoChange(e.target.value)}
                required
                className="appearance-none w-3 h-3 border border-destaque rounded-lg bg-neutra-branca
                cursor-pointer checked:bg-[#001429]"
              />
              {labelText}
            </label>
          );
        })}
      </div>

      <select
        className="bg-neutra-branca border-3 border-[#ddd] rounded-lg p-3 w-full"
        value={curso}
        id="curso"
        onChange={(e) => onCursoChange(e.target.value)}
        required
      >
        <option disabled> Selecione seu curso </option>
        {periodo &&
          cursosFiltrados.map((c) => (
            <option key={c.id} value={c.id}>
              {c.sigla} - {c.nome}
            </option>
          ))}
      </select>
    </>
  );
}
