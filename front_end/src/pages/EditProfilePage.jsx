import Logo from "../assets/logo.png";
import ProfilePhotoUploader from "../components/profilePhotoUploader.jsx";

export default function EditProfilePage() {
  return (
    <div
      className="font-montserrat flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: 'url("../assets/PerfilPageBG.png")' }}
    >
      <div className="flex max-w-[70vw] w-full bg-gray-100 shadow-lg rounded-lg overflow-hidden">
        <div className="flex flex-col gap-2 p-10 flex-1">
          <div className="flex justify-evenly w-[250px] mb-12">
            <div className="flex items-center mb-0.5">
              <img src={Logo} alt="Logo SICA" className="w-10 h-10 mr-0.5" />
            </div>
            <div className="border-l border-[#092843] mx-5" />
            <h2 className="text-[#092843] self-center">Editar Perfil</h2>
          </div>

          <h3 className="text-[#092843] mb-2">Olá, Nome do Brother</h3>
          <div className="border-t border-[#092843] w-full mb-5" />

          <form action="#" method="post" className="flex gap-[10%] w-full">
            <div className="flex justify-around w-full">
              <div className="flex flex-col gap-2 w-2/5">
                {/* Dados Pessoais */}
                <section className="relative">
                  <h4 className="text-[#001429] mb-2">Dados Pessoais</h4>
                  <div className="flex flex-col mb-2">
                    <label htmlFor="name" className="mb-1 text-[#001429]">
                      Nome
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value="Nome do Brother"
                      required
                      className="px-3 py-2 bg-gray-100 border-3 border-gray-300 rounded text-[#001429] text-base w-full"
                    />
                  </div>
                  <div className="flex flex-col mb-2">
                    <label htmlFor="email" className="mb-1 text-[#001429]">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value="emaildobrother@exemplo.com"
                      required
                      className="px-3 py-2 bg-gray-100 border-3 border-gray-300 rounded text-[#001429] text-base w-full"
                    />
                  </div>
                  <div className="flex flex-col mb-2">
                    <label htmlFor="telefone" className="mb-1 text-[#001429]">
                      Telefone
                    </label>
                    <input
                      type="text"
                      maxLength="11"
                      id="telefone"
                      name="telefone"
                      value="1199999-9999"
                      required
                      className="px-3 py-2 bg-gray-100 border-3 border-gray-300 rounded text-[#001429] text-base w-full"
                    />
                  </div>
                  <div className="flex flex-col mb-2">
                    <label
                      htmlFor="dataNascimento"
                      className="mb-1 text-[#001429]"
                    >
                      Data de Nascimento
                    </label>
                    <input
                      type="date"
                      id="dataNascimento"
                      name="dataNascimento"
                      required
                      className="px-3 py-2 bg-gray-100 border-3 border-gray-300 rounded text-[#001429] text-base w-full"
                    />
                  </div>
                </section>

                {/* Informações Acadêmicas */}
                <section className="relative mt-6">
                  <h4 className="text-[#001429] mb-2">Informações Acadêmicas</h4>
                  <div className="flex flex-col mb-2">
                    <label htmlFor="curso" className="mb-1 text-[#001429]">
                      Curso
                    </label>
                    <select
                      id="curso"
                      name="curso"
                      required
                      className="px-3 py-2 bg-gray-100 border-3 border-gray-300 rounded text-[#001429] text-base w-full"
                    >
                      <option value="">Selecione o curso</option>
                      <option value="engenharia">Engenharia</option>
                      <option value="direito">Direito</option>
                      <option value="medicina">Medicina</option>
                      <option value="adm">Administração</option>
                    </select>
                  </div>
                </section>

                {/* Modalidades */}
                <section className="relative mt-6">
                  <h4 className="text-[#001429] mb-2">Modalidades</h4>
                  <div className="flex flex-col mb-2">
                    <label htmlFor="modalidades" className="mb-1 text-[#001429]">
                      Modalidades
                    </label>
                    <select
                      id="modalidades"
                      name="modalidades"
                      required
                      className="px-3 py-2 bg-gray-100 border-3 border-gray-300 rounded text-[#001429] text-base w-full"
                    >
                      <option value="futebol">Futebol</option>
                      <option value="volei">Vôlei</option>
                      <option value="basquete">Basquete</option>
                      <option value="natacao">Natação</option>
                    </select>
                  </div>
                </section>
              </div>

              <div className="flex flex-col gap-2 w-2/5">
                {/* Imagem de Perfil */}
                <section className="relative">
                  <h4 className="text-[#001429] mb-2">Imagem de Perfil</h4>
                  <div className="flex flex-col mb-2">
                    <label htmlFor="imagemPerfil" className="mb-1 text-[#001429]">
                      Imagem de Perfil
                    </label>
                    <ProfilePhotoUploader />
                  </div>
                </section>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
