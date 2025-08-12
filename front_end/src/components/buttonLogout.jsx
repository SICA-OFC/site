import { useNavigate } from "react-router-dom";

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
      <button
        type="submit"
        className="bg-transparent text-red-600 transition-transform duration-500 hover:scale-115 focus:outline-none font-[montserrat]"
      >
        Sair
      </button>
    </form>
  );
}