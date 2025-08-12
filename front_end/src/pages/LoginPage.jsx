import logo from "../assets/logo.png";
import sideImage1 from "../assets/sideImage1.png";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

export default function LoginPage() {
  const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const { executeRecaptcha } = useGoogleReCaptcha();

  const navigate = useNavigate();

  const evtSourceRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const isLoginPage = location.pathname === "/login";
    if (!isLoginPage || !email) return;

    const setupSSE = async () => {
      try {
        const response = await fetch(`${BASE_URL}/usuario/ver`, {
          method: "GET",
          headers: {
            email,
          },
        });
        if (!response.ok) throw new Error("Erro ao buscar usuário");
        const data = await response.json();
        const userId = data.id;

        const evtSource = new EventSource(`${BASE_URL}/usuario/events/${userId}`);
        evtSourceRef.current = evtSource;

        evtSource.addEventListener("account_unlock", (e) => {
          const data = JSON.parse(e.data);
          console.log("Usuário desbloqueado:", data);
          evtSource.close();
        });

        evtSource.addEventListener("account_lock", () => {
          console.log("Usuário bloqueado. Contate o suporte.");
        });

        evtSource.addEventListener("account_close_connection", () => {
          console.log("Conexão encerrada por evento.");
          evtSource.close();
        });

        evtSource.onopen = () => {
          console.log("SSE conectada na página de login.");
        };

        evtSource.onerror = (err) => {
          console.error("Erro SSE:", err);
        };
      } catch (err) {
        console.error("Erro ao configurar SSE:", err);
      }
    };

    setupSSE();

    return () => {
      if (evtSourceRef.current) {
        evtSourceRef.current.close();
        console.log("SSE fechada ao sair da página de login.");
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, email]);

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handleSenhaChange(e) {
    setSenha(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!executeRecaptcha) {
      console.log("reCAPTCHA ainda não disponivel");
      return;
    }

    executeRecaptcha("login_form").then(async (tokenCaptcha) => {
      const verifyResponse = await fetch(`${BASE_URL}/usuario/captcha?token=${tokenCaptcha}`);
      const verifyResult = await verifyResponse.json();
      if (!verifyResult.success || verifyResult.score < 0.5) {
        alert("Verificação do reCAPTCHA falhou. Ação bloqueada.");
        throw new Error("reCAPTCHA inválido.");
      }

      const userInfo = {
        email,
        senha,
      };

      return await fetch(`${BASE_URL}/usuario/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userInfo),
      }).then(async (response) => {
        const result = await response.json();

        if (!response.ok) {
          throw new Error(`Erro ${response.status}: ${JSON.stringify(result)}`);
        }

        const accessToken = result.accessToken;
        console.log("Token recebido:", accessToken);

        if (accessToken) {
          navigate("/confirmacao", {
            state: { accessToken },
          });
        }

      });
    });
  };

  return (
    <div className="bg-[url(/src/assets/background.png)] bg-no-repeat bg-cover bg-center h-screen flex flex-col justify-center items-center gap-2">
      <div className="bg-[#f5f5f5] rounded-md w-[80%] h-fit flex flex-row justify-between items-start">
        <div className="flex flex-col items-center gap-2 w-full md:w-[50%] p-6">
          <div className="flex flex-rol items-center gap-2 w-full">
            <img src={logo} alt="Logo" className="w-12 h-12 object-contain" />
            <div className="h-9 border-l border-black" />
            <h1 className="font-[energy]">Login</h1>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col justify-center items-baseline gap-2 w-[80%]">
            <div>
              <label className="text-[#001429] text-sm" htmlFor="email">
                Email
              </label>
              <input
                className="bg-neutra-branca border-3 border-[#ddd] rounded-lg p-3 w-full"
                value={email}
                onChange={handleEmailChange}
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                required
              />

              <label className="text-[#001429] text-sm" htmlFor="senha">
                Senha
              </label>
              <input
                className="bg-neutra-branca border-3 border-[#ddd] rounded-lg p-3 w-full"
                value={senha}
                onChange={handleSenhaChange}
                type="password"
                id="senha"
                name="senha"
                required
              />
            </div>
            <button
              className="bg-secundaria text-white rounded-md font-semibold h-[50px] w-full hover:bg-neutra-branca hover:text-[#001429] hover:border-secundaria hover:border-1 hover:cursor-pointer transition"
              type="submit"
              name="submit"
              value="login"
            >
              Entrar
            </button>

            <div className="flex flex-col items-center justify-center w-full">
              <span className="text-sm text-center w-full">Ainda não tem conta?</span>
              <span className="text-primaria text-sm text-center w-full">
                <Link to="/cadastro"> Cadastre-se!</Link>
              </span>
            </div>
          </form>
        </div>
        <img src={sideImage1} className="hidden md:block w-[50%] h-full" />
      </div>
    </div>
  );
}
