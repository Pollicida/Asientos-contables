import axios from "axios";

const API_URL = "http://localhost:5000/asientos/ultimosEstados"; // Ajusta la URL según tu backend

export const getRecientes = async () => {
  try {
    const response = await axios.get(API_URL);
    if (response.status == 400) {
      return null; // Retorna null si no se obtuvieron datos
    }
    return response.data; // Retorna los datos obtenidos
  } catch (error) {
    console.error("Error al obtener el mayor:", error);
    throw error; // Lanza el error para manejarlo en el frontend
  }
};