import axios from "axios";

export const getOneAsiento = async (numero: number) => {
  try {
    const response = await axios.get(`http://localhost:5000/asientos/numero/${numero}`);
    return response.data; // Retorna los datos obtenidos
  } catch (error) {
    console.error("Error al obtener el mayor:", error);
    throw error; // Lanza el error para manejarlo en el frontend
  }
};