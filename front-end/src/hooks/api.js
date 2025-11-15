import axios from "axios";
import { BASE_URL } from "../utils/enviromentSettings";
import { toast } from "react-toastify";
import { toastSettings } from "../utils/toastSettings";

const api = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
});

export const Cadastrar = async (data) => {
  try {
    const response = await api.post(`${BASE_URL}/usuario/`, data);
    toast.success("Cadastro feito com sucesso! Prossiga para autenticação de 2 fatores.", toastSettings);
    return response.data;
  } catch (err) {
    toast.error(
      err.response?.data?.erro?.[0]?.msg ||
        err.response?.data?.erro ||
        "Algo deu errado ao cadastrar! Tente novamente!",
      toastSettings
    );

    return null;
  }
};

export const Logar = async (data) => {
  try {
    const response = await api.post(`${BASE_URL}/usuario/login`, data);
    toast.success("Login feito com sucesso! Prossiga para autenticação de 2 fatores.", toastSettings);
    return response.data;
  } catch (err) {
    toast.error(err.response?.data?.erro || "Algo deu errado ao logar! Tente novamente!", toastSettings);
    return null;
  }
};

export const VerificarCodigo = async (codigo_verificacao, accessToken) => {
  try {
    const response = await api.post(
      `${BASE_URL}/usuario/verificar`,
      { codigo_verificacao },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    toast.success("Código verificado com sucesso!", toastSettings);
    return true;
  } catch (err) {
    toast.error(err.response?.data?.erro || "Algo deu errado ao verificar o código! Tente novamente!", toastSettings);
    return null;
  }
};

export const EditarUsuário = async (data, id) => {
  try {
    const url = id ? `${BASE_URL}/usuario/${id}` : `${BASE_URL}/usuario/`;
    const response = await api.patch(url, data);
    toast.success("Usuário atualizado com sucesso!", toastSettings);
    return response.data;
  } catch (err) {
    toast.error(err.response?.data?.erro || "Algo deu errado ao editar o perfil! Tente novamente!", toastSettings);
    return null;
  }
};

export const DeletarUsuário = async (id) => {
  try {
    const url = id ? `${BASE_URL}/usuario/${id}` : `${BASE_URL}/usuario/`;
    const response = await api.delete(url);
    toast.success("Usuário deletado com sucesso!", toastSettings);
    return true;
  } catch (err) {
    console.log(err);
    toast.error(err.response?.data?.erro || "Algo deu errado ao deletar o usuário! Tente novamente!", toastSettings);
    return null;
  }
};

export const VerificarUsuário = async () => {
  try {
    const response = await api.post(`${BASE_URL}/usuario/verificarSessao`, null, {
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    return null;
  }
};

export const DeslogarUsuário = async () => {
  try {
    const response = await api.get(`${BASE_URL}/usuario/logout`, null, {
      withCredentials: true,
    });
    toast.success("Usuário deslogado com sucesso!", toastSettings);
    return response;
  } catch (err) {
    toast.error(err.response?.data?.erro || "Algo deu errado ao deslogar! Tente novamente!", toastSettings);
    return null;
  }
};

export const verUsuário = async (id) => {
  try {
    const url = id ? `${BASE_URL}/usuario/${id}` : `${BASE_URL}/usuario/me`;
    const response = await api.get(url);
    return response.data;
  } catch (err) {
    toast.error(err.response?.data?.erro || "Algo deu errado! Tente novamente!", toastSettings);
    return null;
  }
};

export const verUsuários = async () => {
  try {
    const response = await api.get(`${BASE_URL}/usuario/`);
    return response.data;
  } catch (err) {
    toast.error(err.response?.data.erro || "Algo deu errado! Tente novamente!", toastSettings);
    return null;
  }
};

export const criarTime = async (data) => {
  try {
    const response = await api.post(`${BASE_URL}/time/`, data);
    if (response.data.error) {
      toast.error(response.data.erro || "Algo deu errado! Tente novamente!", toastSettings);
      return true;
    }
    toast.success("Time criado com sucesso!", toastSettings);
    return response.data;
  } catch (err) {
    toast.error(err.response?.data?.erro || "Algo deu errado! Tente novamente!", toastSettings);
    return null;
  }
};

export const editarTime = async (data, id) => {
  try {
    const response = await api.patch(`${BASE_URL}/time/${id}`, data);
    if (response.data.error) {
      toast.error(response.data.erro || "Algo deu errado! Tente novamente!", toastSettings);
      return true;
    }
    toast.success("Time editado com sucesso!", toastSettings);
    return response.data;
  } catch (err) {
    toast.error(err.response?.data?.erro || "Algo deu errado! Tente novamente!", toastSettings);
    return null;
  }
};

export const deletarTime = async (id) => {
  try {
    const response = await api.delete(`${BASE_URL}/time/${id}`);
    if (response.data.error) {
      toast.error(response.data.erro || "Algo deu errado! Tente novamente!", toastSettings);
      return true;
    }
    toast.success("Time apagado com sucesso!", toastSettings);
    return response.data;
  } catch (err) {
    toast.error(err.response?.data?.erro || "Algo deu errado! Tente novamente!", toastSettings);
    return null;
  }
};

export const verTimes = async () => {
  try {
    const response = await api.get(`${BASE_URL}/time/`);
    if (response.data.error) {
      toast.error(response.data.erro || "Algo deu errado! Tente novamente!", toastSettings);
      return true;
    }
    return response.data;
  } catch (err) {
    toast.error(err.response?.data?.erro || "Algo deu errado! Tente novamente!", toastSettings);
    return null;
  }
};

export const verModalidades = async () => {
  try {
    const response = await api.get(`${BASE_URL}/time/modalidades`);
    if (response.data.error) {
      toast.error(response.data.erro || "Algo deu errado! Tente novamente!", toastSettings);
      return true;
    }
    return response.data;
  } catch (err) {
    toast.error(err.response?.data?.erro || "Algo deu errado! Tente novamente!", toastSettings);
    return null;
  }
};

export const criarCampeonato = async (data) => {
  try {
    const response = await api.post(`${BASE_URL}/campeonato`, data);
    if (response.data.error) {
      toast.error(response.data.erro || "Algo deu errado! Tente novamente!", toastSettings);
      return true;
    }
    toast.success("Campeonato criado com sucesso!", toastSettings);
    return response.data;
  } catch (err) {
    toast.error(err.response?.data?.erro || "Algo deu errado! Tente novamente!", toastSettings);
    return null;
  }
};

export const editarCampeonato = async (data, id) => {
  try {
    const response = await api.patch(`${BASE_URL}/campeonato/${id}`, data);
    if (response.data.error) {
      toast.error(response.data.erro || "Algo deu errado! Tente novamente!", toastSettings);
      return true;
    }
    toast.success("Campeonato editado com sucesso!", toastSettings);
    return response.data;
  } catch (err) {
    toast.error(err.response?.data?.erro || "Algo deu errado! Tente novamente!", toastSettings);
    return null;
  }
};

export const deletarCampeonato = async (id) => {
  try {
    const response = await api.delete(`${BASE_URL}/campeonato/${id}`);
    if (response.data.error) {
      toast.error(response.data.erro || "Algo deu errado! Tente novamente!", toastSettings);
      return true;
    }
    toast.success("Campeonato apagado com sucesso!", toastSettings);
    return response.data;
  } catch (err) {
    toast.error(err.response?.data?.erro || "Algo deu errado! Tente novamente!", toastSettings);
    return null;
  }
};

export const verCampeonatos = async () => {
  try {
    const response = await api.get(`${BASE_URL}/campeonato/`);
    if (response.data.error) {
      toast.error(response.data.erro || "Algo deu errado! Tente novamente!", toastSettings);
      return true;
    }
    return response.data;
  } catch (err) {
    toast.error(err.response?.data?.erro || "Algo deu errado! Tente novamente!", toastSettings);
    return null;
  }
};

export const comecarCampeonato = async (id) => {
  try {
    const response = await api.post(`${BASE_URL}/campeonato/${id}/start`);
    if (response.data.error) {
      toast.error(response.data.erro || "Algo deu errado! Tente novamente!", toastSettings);
      return true;
    }
    toast.success("Campeonato iniciado com sucesso!", toastSettings);
    return response.data;
  } catch (err) {
    toast.error(err.response?.data?.erro || "Algo deu errado! Tente novamente!", toastSettings);
    return null;
  }
};

export const finalizarCampeonato = async (id) => {
  try {
    const response = await api.post(`${BASE_URL}/campeonato/${id}/finalize`);
    if (response.data.error) {
      toast.error(response.data.erro || "Algo deu errado! Tente novamente!", toastSettings);
      return true;
    }
    toast.success("Campeonato finalizado com sucesso!", toastSettings);
    return response.data;
  } catch (err) {
    toast.error(err.response?.data?.erro || "Algo deu errado! Tente novamente!", toastSettings);
    return null;
  }
};

export const resetarCampeonato = async (id) => {
  try {
    const response = await api.post(`${BASE_URL}/campeonato/${id}/reset`);
    if (response.data.error) {
      toast.error(response.data.erro || "Algo deu errado! Tente novamente!", toastSettings);
      return true;
    }
    toast.success("Campeonato resetado com sucesso!", toastSettings);
    return response.data;
  } catch (err) {
    toast.error(err.response?.data?.erro || "Algo deu errado! Tente novamente!", toastSettings);
    return null;
  }
};

export const adicionarParticipantes = async (data, id) => {
  try {
    const response = await api.post(`${BASE_URL}/campeonato/${id}/participants/bulk_add`, data);
    if (response.data.error) {
      toast.error(response.data.erro || "Algo deu errado! Tente novamente!", toastSettings);
      return true;
    }
    return response.data;
  } catch (err) {
    toast.error(err.response?.data?.erro || "Algo deu errado! Tente novamente!", toastSettings);
    return null;
  }
};

export const removerParticipantes = async (id) => {
  try {
    const response = await api.delete(`${BASE_URL}/campeonato/${id}/participants/clear`);
    if (response.data.error) {
      toast.error(response.data.erro || "Algo deu errado! Tente novamente!", toastSettings);
      return true;
    }
    return response.data;
  } catch (err) {
    toast.error(err.response?.data?.erro || "Algo deu errado! Tente novamente!", toastSettings);
    return null;
  }
};

export const verParticipantes = async (id) => {
  try {
    const response = await api.get(`${BASE_URL}/campeonato/${id}/participants/`);
    if (response.data.error) {
      toast.error(response.data.erro || "Algo deu errado! Tente novamente!", toastSettings);
      return true;
    }
    return response.data;
  } catch (err) {
    toast.error(err.response?.data?.erro || "Algo deu errado! Tente novamente!", toastSettings);
    return null;
  }
};

export const editarParticipantes = async (data, id, participantId) => {
  try {
    const response = await api.patch(`${BASE_URL}/campeonato/${id}/participants/${participantId}`, data);
    if (response.data.error) {
      toast.error(response.data.erro || "Algo deu errado! Tente novamente!", toastSettings);
      return true;
    }
    return response.data;
  } catch (err) {
    toast.error(err.response?.data?.erro || "Algo deu errado! Tente novamente!", toastSettings);
    return null;
  }
};

export const verPartidas = async (id) => {
  try {
    const response = await api.get(`${BASE_URL}/campeonato/${id}/matches/`);
    if (response.data.error) {
      toast.error(response.data.erro || "Algo deu errado! Tente novamente!", toastSettings);
      return true;
    }
    return response.data;
  } catch (err) {
    toast.error(err.response?.data?.erro || "Algo deu errado! Tente novamente!", toastSettings);
    return null;
  }
};

export const editarPartidas = async (data, id, matchId) => {
  try {
    const response = await api.patch(`${BASE_URL}/campeonato/${id}/matches/${matchId}`, data);
    toast.success("Placar atualizado com sucesso!", toastSettings);
    return response.data;
  } catch (err) {
    toast.error(err.response?.data?.erro || "Algo deu errado! Tente novamente!", toastSettings);
    return null;
  }
};

export const adicionarData = async (data, id, matchId) => {
  try {
    const response = await api.patch(`${BASE_URL}/campeonato/${id}/matches/${matchId}/attachments`, data);
    return response.data;
  } catch (err) {
    toast.error(err.response?.data?.erro || "Algo deu errado! Tente novamente!", toastSettings);
    return null;
  }
};

export const verDatas = async (id, matchId) => {
  try {
    const response = await api.get(`${BASE_URL}/campeonato/${id}/matches/${matchId}/attachments`);
    return response.data;
  } catch (err) {
    toast.error(err.response?.data?.erro || "Algo deu errado! Tente novamente!", toastSettings);
    return null;
  }
};
