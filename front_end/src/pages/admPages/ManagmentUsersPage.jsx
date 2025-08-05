import React from "react";
import { Link } from "react-router-dom";

import Logo from "../../assets/logo.png";
import ProfilePhotoUploader from "../../components/profilePhotoUploader.jsx";
import genericProfilePhoto from "../../assets/genericProfilePhoto.png";

function ClickableUserEntry({ name, rm, course, modality }) {
  return (
    <p className="text-sm mb-1">
      <span className="text-[#f26522]">
        {name} | {rm} | {course} | {modality}
      </span>
    </p>
  );
}

export default function ManagmentUsersPage() {
  const users = Array(12)
    .fill(0)
    .map((_, i) => ({
      name: `Fulano ${i + 1}`,
      rm: 33197 + i,
      course: "Mecânica",
      modality: "Futebol",
      categoria: "SUB 17",
    }));

  const [selectedUser, setSelectedUser] = React.useState(users[0]);

  return (
    <div
      className="min-h-screen bg-cover font-montserrat"
      style={{ backgroundImage: "url('/assets/AdmBG.png')" }}
    >
      <div className="bg-white p-12 mt-[200px] ml-[340px] w-[90%] max-w-[1200px] shadow-md rounded">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <img src={Logo} alt="Logo" className="w-[50px] h-[50px]" />
            <div className="border-l border-[#0c2442] w-[10px] h-[50px]"></div>
            <h1 className="text-lg mt-5">Área do Administrador</h1>
          </div>
        </div>

        {/* Content */}
        <div className="flex gap-8">
          {/* Lista de usuários */}
          <div className="flex-1">
            <h2 className="text-lg mb-2">VISUALIZAR ALUNOS</h2>
            <div className="h-px bg-black mb-4"></div>
            {users.map((user, i) => (
              <div
                key={i}
                className={`text-sm mb-1 p-1 rounded cursor-pointer ${
                  selectedUser && selectedUser.rm === user.rm
                    ? "bg-gray-300"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => setSelectedUser(user)}
              >
                <ClickableUserEntry
                  name={user.name}
                  rm={user.rm}
                  course={user.course}
                  modality={user.modality}
                />
              </div>
            ))}
          </div>

          {/* Info do aluno selecionado */}
          <div className="flex-1">
            <h2 className="text-xl font-bold mb-4">
              {selectedUser ? selectedUser.name : ""}
            </h2>

            {/* Campos */}
            {["rm", "course", "modality", "categoria"].map((field, idx) => (
              <div className="mb-4" key={idx}>
                <label className="block text-xs text-gray-600 uppercase mb-1">
                  {field.toUpperCase()}
                </label>
                <input
                  type="text"
                  value={selectedUser ? selectedUser[field] : ""}
                  readOnly
                  className="w-full p-2 text-base border border-gray-300 rounded"
                />
              </div>
            ))}

            {/* Foto de perfil */}
            <div className="mb-4">
              <label className="block text-xs text-gray-600 uppercase mb-1">
                Foto de Perfil
              </label>
              <ProfilePhotoUploader
                photoUrl={genericProfilePhoto}
                onPhotoChange={(newPhoto) =>
                  console.log("New photo URL:", newPhoto)
                }
              />
            </div>
          </div>
        </div>

        {/* Botões */}
        <div className="flex justify-evenly px-[20%] mt-8">
          <button className="bg-[#0c2442] text-[#f5f5f5] py-3 px-6 rounded border border-[#f5f5f5] hover:bg-[#f5f5f5] hover:text-[#0c2442] hover:border-[#0c2442] transition">
            Alterar
          </button>
          <Link to="/adm">
            <button className="bg-[#f18e2c] text-[#001429] py-3 px-6 rounded border border-[#f18e2c] hover:bg-[#f5f5f5] hover:text-[#f18e2c] hover:border-[#f18e2c] transition">
              Voltar
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
