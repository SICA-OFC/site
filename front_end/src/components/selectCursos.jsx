import { useState, useEffect } from "react";
import styles from "../pages/CadastroPage.module.scss";

const cursos = [
    { id: 1, sigla: '1AM', nome: 'Administração M-tec', periodo: 'Manhã' },
    { id: 2, sigla: '2AM', nome: 'Administração M-tec', periodo: 'Manhã' },
    { id: 3, sigla: '3AM', nome: 'Administração M-tec', periodo: 'Manhã' },
    { id: 4, sigla: '1BM', nome: 'Mecânica M-tec', periodo: 'Manhã' },
    { id: 5, sigla: '2BM', nome: 'Mecânica M-tec', periodo: 'Manhã' },
    { id: 6, sigla: '3BM', nome: 'Mecânica M-tec', periodo: 'Manhã' },
    { id: 7, sigla: '1DM', nome: 'Eletrônica M-tec', periodo: 'Manhã' },
    { id: 8, sigla: '3DM', nome: 'Eletrônica M-tec', periodo: 'Manhã' },
    { id: 9, sigla: '1EM', nome: 'Desenvolvimento de Sistemas M-tec', periodo: 'Manhã' },
    { id: 10, sigla: '2EM', nome: 'Desenvolvimento de Sistemas M-tec', periodo: 'Manhã' },
    { id: 11, sigla: '3EM', nome: 'Desenvolvimento de Sistemas M-tec', periodo: 'Manhã' },
    { id: 12, sigla: '1FM', nome: 'Mecatrônica M-tec', periodo: 'Manhã' },
    { id: 13, sigla: '2FM', nome: 'Mecatrônica M-tec', periodo: 'Manhã' },
    { id: 14, sigla: '3FM', nome: 'Mecatrônica M-tec', periodo: 'Manhã' },
    { id: 15, sigla: '1AT', nome: 'Administração M-tec', periodo: 'Tarde' },
    { id: 16, sigla: '2AT', nome: 'Administração M-tec', periodo: 'Tarde' },
    { id: 17, sigla: '3AT', nome: 'Administração M-tec', periodo: 'Tarde' },
    { id: 18, sigla: '1CT', nome: 'Automação M-tec', periodo: 'Tarde' },
    { id: 19, sigla: '2CT', nome: 'Automação M-tec', periodo: 'Tarde' },
    { id: 20, sigla: '3CT', nome: 'Automação M-tec', periodo: 'Tarde' },
    { id: 21, sigla: '1FT', nome: 'Mecatrônica M-tec', periodo: 'Tarde' },
    { id: 22, sigla: '2FT', nome: 'Mecatrônica M-tec', periodo: 'Tarde' },
    { id: 23, sigla: '3FT', nome: 'Mecatrônica M-tec', periodo: 'Tarde' },
    { id: 24, sigla: '1GT', nome: 'Desenvolvimento de Sistemas Ptech', periodo: 'Tarde' },
    { id: 25, sigla: '2GT', nome: 'Desenvolvimento de Sistemas Ptech', periodo: 'Tarde' },
    { id: 26, sigla: '3GT', nome: 'Desenvolvimento de Sistemas Ptech', periodo: 'Tarde' },
    { id: 27, sigla: '1HT', nome: 'Informática M-tec', periodo: 'Tarde' },
    { id: 28, sigla: '2HT', nome: 'Informática M-tec', periodo: 'Tarde' },
    { id: 29, sigla: '3HT', nome: 'Informática M-tec', periodo: 'Tarde' },
    { id: 30, sigla: '1BN', nome: 'Mecânica M-tec N', periodo: 'Noite' },
    { id: 31, sigla: '1DN', nome: 'Eletrônica M-tec N', periodo: 'Noite' },
    { id: 32, sigla: '2DN', nome: 'Eletrônica M-tec N', periodo: 'Noite' },
    { id: 33, sigla: '1FN', nome: 'Automação M-tec N', periodo: 'Noite' },
];

export default function SelectCursos({ periodo, curso, onPeriodoChange, onCursoChange }) {
  const [cursosFiltrados, setCursosFiltrados] = useState([]);

  useEffect(() => {
    if (periodo) {
      const filtrados = cursos.filter(c => c.periodo === periodo);
      setCursosFiltrados(filtrados);
      onCursoChange(""); // Reseta o curso ao mudar período
    }
  }, [onCursoChange, periodo]);

  return (
    <>
      <div className={styles.radio_periodo}>
        {["Manhã", "Tarde", "Noite"].map((p) => (
          <label key={p}>
            <input
              type="radio"
              name="periodo"
              value={p}
              checked={periodo === p}
              onChange={(e) => onPeriodoChange(e.target.value)}
              required
            />
            {p}
          </label>
        ))}
      </div>

        <select
          className={styles.input_select}
          value={curso}
          onChange={(e) => onCursoChange(e.target.value)}
          required
        >
          <option value="" disabled>Selecione seu curso</option>
      {periodo && (
          cursosFiltrados.map((c) => (
            <option key={c.id} value={c.id}>
              {c.sigla} - {c.nome}
            </option>
          ))
        )}
        </select>
    </>
  );
}