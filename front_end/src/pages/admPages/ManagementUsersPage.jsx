import React from "react";
import { Link } from "react-router-dom";

import Logo from "../../assets/logo.png";
import ProfileUploader from "../../components/ProfileUploader.jsx";
import genericProfilePhoto from "../../assets/profilePhoto.png";

function ClickableUserEntry({ name, rm, course, modality }) {
  return (
    <p className="text-sm mb-1">
      <span className="text-[#f26522]">
        {name} | {rm} | {course} | {modality}
      </span>
    </p>
  );
}

export default function ManagementUsersPage() {
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
    <div className="min-h-screen bg-cover font-montserrat">
      <div className="bg-white p-12 mt-[100px] ml-[340px] w-[90%] max-w-[1200px] shadow-md rounded">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <img src={Logo} alt="Logo" className="w-[50px] h-[50px]" />
            <div className="border-l border-[#0c2442] w-[10px] h-[50px]"></div>
            <h1 className="text-lg font-[energy] mt-5">
              Área do Administrador
            </h1>
          </div>
        </div>

        {/* Content */}
        <div className="flex gap-8">
          {/* Lista de usuários */}
          <div className="flex-1">
            <h2 className="text-lg mb-2 font-[energy]">VISUALIZAR ALUNOS</h2>
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
              <div className="mb-4 relative" key={idx}>
                <label className="block text-xs text-gray-600 uppercase mb-1">
                  {field.toUpperCase()}
                </label>
                <input
                  type="text"
                  value={selectedUser ? selectedUser[field] : ""}
                  readOnly
                  className="w-full p-2 text-base border border-gray-300 rounded"
                />
                <button className="decoration-none absolute right-0 mt-2.5 mr-2.5">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-[25px] h-[25px] cursor-pointer"
                  >
                    <path
                      d="M1 22C1 21.4477 1.44772 21 2 21H22C22.5523 21 23 21.4477 23 22C23 22.5523 22.5523 23 22 23H2C1.44772 23 1 22.5523 1 22Z"
                      fill="#001429be"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M18.3056 1.87868C17.1341 0.707107 15.2346 0.707107 14.063 1.87868L3.38904 12.5526C2.9856 12.9561 2.70557 13.4662 2.5818 14.0232L2.04903 16.4206C1.73147 17.8496 3.00627 19.1244 4.43526 18.8069L6.83272 18.2741C7.38969 18.1503 7.89981 17.8703 8.30325 17.4669L18.9772 6.79289C20.1488 5.62132 20.1488 3.72183 18.9772 2.55025L18.3056 1.87868ZM15.4772 3.29289C15.8677 2.90237 16.5009 2.90237 16.8914 3.29289L17.563 3.96447C17.9535 4.35499 17.9535 4.98816 17.563 5.37868L15.6414 7.30026L13.5556 5.21448L15.4772 3.29289ZM12.1414 6.62869L4.80325 13.9669C4.66877 14.1013 4.57543 14.2714 4.53417 14.457L4.0014 16.8545L6.39886 16.3217C6.58452 16.2805 6.75456 16.1871 6.88904 16.0526L14.2272 8.71448L12.1414 6.62869Z"
                      fill="#001429be"
                    />
                  </svg>
                </button>
              </div>
            ))}

            {/* Foto de perfil */}
            <div className="mb-4">
              <label className="block text-xs text-gray-600 uppercase mb-1">
                Foto de Perfil
              </label>
              <ProfileUploader
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
          <button className="bg-[#0c2442] text-[#f5f5f5] py-3 px-6 rounded border border-[#f5f5f5] hover:bg-[#f5f5f5] hover:text-[#0c2442] hover:border-[#0c2442] transition cursor-pointer">
            Alterar
          </button>
          <Link to="/adm">
            <button className="bg-[#f18e2c] text-[#001429] py-3 px-6 rounded border border-[#f18e2c] hover:bg-[#f5f5f5] hover:text-[#f18e2c] hover:border-[#f18e2c] transition cursor-pointer">
              Voltar
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
