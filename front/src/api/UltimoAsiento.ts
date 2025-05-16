import axios from "axios";

const API_URL = "http://localhost:5000/asientos/ultimoEstado"; // Ajusta la URL según tu backend

export const getUltimoAsiento = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.data; // Retorna los datos obtenidos
  } catch (error) {
    console.error("Error al obtener el mayor:", error);
    throw error; // Lanza el error para manejarlo en el frontend
  }
};