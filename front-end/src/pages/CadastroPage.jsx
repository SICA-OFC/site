import { useEffect, useRef, useState } from 'react';
import logo from '../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import SelectCursos from '../components/selectCursos.jsx';
import { Cadastrar, verModalidades } from '../hooks/api.js';
import { formatTelefone } from '../utils/sanitization.js';

export default function CadastroPage() {
  const navigate = useNavigate();

  const [rm, setRm] = useState('');
  const [nome, setNome] = useState('');
  const [periodo, setPeriodo] = useState('1');
  const [curso, setCurso] = useState('1');
  const [email, setEmail] = useState('');
  const [data_nascimento, setData] = useState('');
  const [senha, setSenha] = useState('');
  const [telefone, setTelefone] = useState('');
  const [selectedModalidades, setSelectedModalidades] = useState([]);
  const [availableModalidades, setAvailableModalidades] = useState([]);

  const fetchedRef = useRef();
  async function handleUser() {
    const { modalidades } = await verModalidades();

    if (modalidades) {
      setAvailableModalidades(modalidades);
    }
  }

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;

    handleUser();
  }, []);

  function handleChange(e) {
    const { name, value, checked } = e.target;
    if (name === 'modalidade') {
      setSelectedModalidades((prev) => (checked ? [...prev, parseInt(value)] : prev.filter((id) => id !== parseInt(value))));
    }

    const setters = {
      rm: (v) => setRm(v.replace(/\D/g, '')),
      nome: setNome,
      email: setEmail,
      data_nascimento: setData,
      senha: setSenha,
      telefone: (v) => setTelefone(formatTelefone(v)),
    };
    setters[name]?.(value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const modalidades = Array.isArray(selectedModalidades) ? selectedModalidades.map((id) => Number(id)).filter((id) => !isNaN(id)) : [];

    const data = {
      rm,
      nome,
      curso_id: parseInt(curso),
      email,
      data_nascimento,
      senha,
      telefone,
      modalidades,
    };

    
    const result = await Cadastrar(data);
    if (result) {
      navigate('/confirmacao', { state: { accessToken: result.accessToken } });
    }
  };

  return (
    <div className="bg-[url(/src/assets/background.png)] bg-no-repeat bg-cover bg-center h-screen flex flex-col justify-center items-center gap-2">
      <div className="bg-neutra-branca rounded-xl shadow-lg w-[80%] h-fit flex flex-row justify-between items-start px-3">
        <div className="flex flex-col items-center gap-4 w-full h-full overflow-y-scroll md:overflow-y-hidden">
          <div className="flex flex-row items-center gap-2 w-full">
            <img src={logo} alt="Logo" className="w-12 h-12 object-contain" />
            <div className="h-9 border-l border-black" />
            <h1 className="font-[energy] text-xl">Cadastro</h1>
          </div>

          <form className="flex flex-col justify-center items-center gap-2.5 w-[80%]" onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row justify-start items-start gap-[5%] w-full">
              {/* Coluna Esquerda */}
              <div className="w-full md:w-[50%] space-y-2">
                <label className="text-sm" htmlFor="rm">
                  RM
                </label>
                <input className="bg-neutra-branca border-2 border-[#ddd] rounded-lg p-2 w-full" value={rm} onChange={handleChange} type="number" id="rm" name="rm" min="10000" max="99999" required />

                <label className="text-sm" htmlFor="nome">
                  Nome
                </label>
                <input className="bg-neutra-branca border-2 border-[#ddd] rounded-lg p-2 w-full" value={nome} onChange={handleChange} type="text" id="nome" name="nome" required />

                <label className="text-sm" htmlFor="nascimento">
                  Data de Nascimento
                </label>
                <input className="bg-neutra-branca border-2 border-[#ddd] rounded-lg p-2 w-full" value={data_nascimento} onChange={handleChange} type="date" id="nascimento" name="data_nascimento" min="2000-01-01" max={new Date().toISOString().split('T')[0]} required />

                <span className="text-sm">Classe</span>
                <SelectCursos periodo={periodo} curso={curso} onPeriodoChange={setPeriodo} onCursoChange={setCurso} />
              </div>

              {/* Coluna Direita */}
              <div className="w-full md:w-[50%] space-y-2">
                <label className="text-sm" htmlFor="email">
                  Email
                </label>
                <input className="bg-neutra-branca border-2 border-[#ddd] rounded-lg p-2 w-full" value={email} onChange={handleChange} type="email" id="email" name="email" autoComplete="email" pattern="^[a-zA-Z0-9._]+@(gmail\.com|hotmail\.com|etec\.sp\.gov\.br)$" title="O email deve ser do domínio gmail.com, hotmail.com ou etec.sp.gov.br" required />

                <label className="text-sm" htmlFor="senha">
                  Senha
                </label>
                <input className="bg-neutra-branca border-2 border-[#ddd] rounded-lg p-2 w-full" value={senha} onChange={handleChange} type="password" id="senha" name="senha" required />

                <label className="text-sm" htmlFor="telefone">
                  Telefone
                </label>
                <input className="bg-neutra-branca border-2 border-[#ddd] rounded-lg p-2 w-full" maxLength="15" minLength="13" value={telefone} onChange={handleChange} type="text" id="telefone" name="telefone" required />

                <span className="text-neutra-preta mb-2">Modalidades</span>
                <div className="grid grid-cols-2 gap-2">
                  {availableModalidades &&
                    availableModalidades.map((mod) => (
                      <label key={mod.id} className="flex items-center gap-2 text-neutra-preta">
                        <input type="checkbox" name="modalidade" value={mod.id} checked={selectedModalidades.includes(mod.id)} onChange={handleChange} className="w-4 h-4" />
                        {mod.nome}
                      </label>
                    ))}
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center gap-[5%] w-full">
              <button
                type="submit"
                className="bg-secundaria text-white rounded-md font-semibold h-[50px] w-1/2 cursor-pointer 
              transition-all duration-300 hover:bg-neutra-branca hover:text-secundaria hover:border 
              hover:border-secundaria"
              >
                Cadastrar
              </button>

              <div className="flex flex-col items-center justify-center w-full">
                <span className="text-sm text-center">Já tem conta?</span>
                <Link to="/login" className="text-primaria text-sm text-center hover:underline">
                  Entre!
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
