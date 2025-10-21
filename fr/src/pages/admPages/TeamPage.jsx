import { useEffect, useRef, useState } from "react";
import logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { HandleIsAdmin } from "../../utils/handleIsAdmin";
import { criarTime, deletarTime, editarTime, verTimes, verUsuários } from "../../hooks/api";

function ClickableUserEntry({ name, rm, course }) {
  const parts = [name, rm, course].filter(Boolean);
  return (
    <p className="text-sm">
      <span className="text-[#f26522]">{parts.join(" | ")}</span>
    </p>
  );
}

export default function TournmentCreatorPage() {
  const navigate = useNavigate();
  const fetchedRef = useRef(false);
  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;

    (async () => {
      const isAdmin = await HandleIsAdmin(navigate);
      if (isAdmin) {
        HandleUsers();
        HandleTeams();
      }
    })();
  }, []);

  const [users, setUsers] = useState([]);
  const [teams, setTeams] = useState([]);

  const [nome, setNome] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [filtro, setFiltro] = useState("Futebol");

  const [editNome, setEditNome] = useState("");
  const [selectedTeam, setSelectedTeam] = useState([]);
  const [selectedTeamIds, setSelectedTeamIds] = useState([]);
  const modalidades = {
    Futebol: false,
    Vôlei: false,
    Basquete: false,
    Natação: false,
  }

  const HandleUsers = async () => {
    const result = await verUsuários();

    if (result) {
      const usuarios = result.usuarios;
      if (usuarios.length > 0) {
        setUsers(usuarios);
      }
    };
  }

  const HandleTeams = async () => {
    const result = await verTimes();

    if (result) {
      const teams = result.times;
      setTeams(teams);
    }
  };

  function handleChange(e) {
    const { name, value } = e.target;

    const setters = {
      nome: setNome,
      editNome: setEditNome,
      filtro: (v) => {
        setFiltro(v);
        setSelectedIds([]);
      },
    };

    setters[name]?.(value);
  }

  function toggleUserId(id) {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  }

  function toggleEditUserId(id) {
    setSelectedTeamIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      nome,
      member_ids: selectedIds,
    };

    const result = await criarTime(data);
    if (result) {
      setSelectedIds([]);
      setNome("");
      HandleTeams();
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    const data = {
      nome: editNome,
      member_ids: selectedTeamIds,
    };

    const result = await editarTime(data, selectedTeam.id);
    if (result) {
      HandleTeams();
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    const result = await deletarTime(selectedTeam.id)
    if (result) {
      setSelectedTeamIds([]);
      setEditNome("");
      HandleTeams();
    }
  };

  return (
    <div
      className="min-h-screen bg-[url('/assets/AdmBG.png')]  bg-cover bg-center flex 
      flex-col gap-5 py-5 items-center justify-center"
    >
      {/* CADASTRAR TIME */}
      <div className="bg-neutra-branca rounded shadow-[0_0_30px_rgba(0,0,0,0.1)] p-[3%] max-w-[500px] w-full flex flex-col items-center">
        <div className="flex items-center w-full">
          <img src={logo} alt="Logo" className="w-[80px]" />
          <div className="border-l border-neutra-preta w-[10px] h-[60px] mx-4"></div>
          <h2 className="text-lg font-[energy]">Área do Administrador</h2>
        </div>

        <form onSubmit={handleSubmit} className="w-full">
          <div className="w-full">
            <label className="text-sm text-center w-full" htmlFor="nome">
              Nome do time
            </label>
            <input
              className="bg-neutra-branca border-3 border-[#ddd] rounded-lg p-3 w-full"
              value={nome}
              onChange={handleChange}
              type="text"
              id="nome"
              name="nome"
              pattern="[a-zA-Z0-9\u00C0-\u024F\s-]+"
              required
            />

            <span className="text-sm text-center w-full mt-3">
              Membros
            </span>
            <div className="w-full overflow-y-scroll max-h-[220px] flex flex-col gap-1 mt-2">
              {users
                .filter((u) => {
                  if (!filtro) return true;
                  const userModalidades = JSON.parse(u.modalidades || "{}");
                  return !!userModalidades[filtro];
                })
                .map((u) => (
                  <div key={u.id} className="cursor-pointer hover:bg-gray-100 p-1 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        name="checkbox"
                        checked={selectedIds.includes(u.id)}
                        onChange={(ev) => {
                          ev.stopPropagation();
                          toggleUserId(u.id);
                        }}
                        className="w-4 h-4"
                      />
                      <ClickableUserEntry name={u.nome} rm={u.rm} course={u.cursos?.nome || "—"} />
                    </div>
                  </div>
                ))}
            </div>

            <p className="text-xs mt-2">Selecionados: {selectedIds.length}</p>

            <label className="text-sm text-center w-full mt-3" htmlFor="filtro">
              Modalidade
            </label>
            <select
              id="filtro"
              name="filtro"
              onChange={handleChange}
              className="bg-neutra-branca border-3 border-[#ddd] rounded-lg p-3 w-full"
            >
              <option value="" disabled>
                Selecione uma modalidade
              </option>
              {Object.keys(modalidades).map((mod) => (
                <option key={mod} value={mod}>
                  {mod.charAt(0).toUpperCase() + mod.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Botões */}
          <div className="flex justify-center gap-5 mt-8">
            <button
              type="submit"
              className="bg-neutra-preta text-white px-6 py-2 rounded-lg border border-neutra-branca cursor-pointer transition-all duration-300 hover:bg-white hover:text-neutra-preta hover:border-neutra-preta"
            >
              Cadastrar Time
            </button>

            <Link to="/adm">
              <button
                type="button"
                className="bg-destaque text-white px-6 py-2 rounded-lg border border-neutra-branca cursor-pointer transition-all duration-300 hover:bg-white hover:text-destaque hover:border-destaque"
              >
                Voltar
              </button>
            </Link>
          </div>
        </form>
      </div>

      {/* EDITAR TIME */}
      <div className="bg-neutra-branca rounded shadow-[0_0_30px_rgba(0,0,0,0.1)] p-[3%] max-w-[500px] w-full flex flex-col items-center">
        {teams?.length > 0 ? (
          <form onSubmit={handleEdit} className="w-full">
            <label className="text-sm text-center w-full" htmlFor="nome">
              Times
            </label>
            <div className="w-full overflow-y-scroll max-h-[220px] flex flex-col gap-1 mt-2">
              {teams.map((t) => (
                <div
                  key={t.id}
                  onClick={() => {
                    setSelectedTeam(t);
                    setEditNome(t.nome);
                    setSelectedTeamIds(t.membros_time?.map((m) => m.membro_id) || []);
                  }}
                  className="cursor-pointer hover:bg-gray-100 p-1 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <ClickableUserEntry name={t.nome} modality={t.modality || "—"} />
                  </div>
                </div>
              ))}
            </div>

            <label className="text-sm text-center w-full mt-3" htmlFor="editNome">
              Nome do time
            </label>
            <input
              className="bg-neutra-branca border-3 border-[#ddd] rounded-lg p-3 w-full"
              value={editNome}
              onChange={handleChange}
              type="text"
              id="editNome"
              name="editNome"
              required
            />

            <span className="text-sm text-center w-full mt-3">
              Membros
            </span>
            <div className="w-full overflow-y-scroll max-h-[220px] flex flex-col gap-1 mt-2">
              {users.map((u) => (
                <div key={u.id} className="cursor-pointer hover:bg-gray-100 p-1 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      name="checkbox"
                      checked={selectedTeamIds.includes(u.id)}
                      onChange={(ev) => {
                        ev.stopPropagation();
                        toggleEditUserId(u.id);
                      }}
                      className="w-4 h-4"
                    />
                    <ClickableUserEntry name={u.nome} />
                  </div>
                </div>
              ))}
            </div>

            <p className="text-xs mt-2">Selecionados: {selectedTeamIds.length}</p>

            <div className="flex justify-center gap-5 mt-8">
              <button
                type="submit"
                className="bg-neutra-preta text-white px-6 py-2 rounded-lg border border-neutra-branca cursor-pointer transition-all duration-300 hover:bg-white hover:text-neutra-preta hover:border-neutra-preta"
              >
                Atualizar Time
              </button>

              <button
                onClick={handleDelete}
                type="button"
                className="bg-[red] text-white px-6 py-2 rounded-lg border border-neutra-branca cursor-pointer transition-all duration-300 hover:bg-white hover:text-[red] hover:border-[red]"
              >
                Deletar Time
              </button>
            </div>
          </form>
        ) : (
          <p className="text-center text-sm text-gray-500 mt-2">Sem times</p>
        )}
      </div>
    </div>
  );
}
