import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import styles from "./TournmentCreator.module.scss";
import logo from "../../assets/logo.png";

export default function CadastroTorneio() {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        {/* Cabeçalho */}
        <div className={styles.header}>
          <img src={logo} alt="Logo" className={styles.logo} />
          <div className={styles.verticalLine}></div>
          <h2>Área do Administrador</h2>
        </div>

        {/* Formulário */}
        <form className={styles.form}>
          <div className={styles.inputs}>
            <div className={styles.inputGroup}>
              <label>Nome do Torneio</label>
              <input type="text" />
            </div>

            <div className={styles.inputGroup}>
              <label>Modalidade</label>
              <select>
                <option>Selecione</option>
                <option>Futebol</option>
                <option>Vôlei</option>
              </select>
            </div>

            <div className={styles.inputGroup}>
              <label>Local</label>
              <select>
                <option>Selecione</option>
                <option>Quadra 1</option>
                <option>Quadra 2</option>
              </select>
            </div>

            <div className={styles.inputGroup}>
              <label>Quantidade de Times</label>
              <input type="number" />
            </div>

            <div className={styles.inputGroup}>
              <label>Horário</label>
              <input type="time" />
            </div>

            <div className={styles.inputGroup}>
              <label>Quantidade de Jogos</label>
              <input type="number" />
            </div>

            {/* Calendário */}
            <div className={styles.calendarSection}>
              <label>Selecione a Data:</label>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="dd/MM/yyyy"
                placeholderText="Clique para escolher uma data"
                className={styles.datePickerInput}
              />
            </div>
          </div>
          {/* Botões */}
          <div className={styles.buttonGroup}>
            <button type="submit" className={styles.submitButton}>
              Cadastrar Torneio
            </button>
            <button type="reset" className={styles.resetButton}>
              Limpar Campos
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
