import { useNavigate } from "react-router-dom";
import "./css/header.css";

export default function LogoutButton() {
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${BASE_URL}/usuario/logout`, {
        method: "POST",
        credentials: "include",
      });

      const json = await res.json();

      if (res.ok) {
        navigate("/login");
      } else {
        alert(json.erro || "Erro ao sair");
      }
    } catch (err) {
      console.error("Erro no logout:", err);
      alert("Erro inesperado ao sair");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <button className="ExitButton" type="submit">
        Sair
      </button>
    </form>
  );
}
