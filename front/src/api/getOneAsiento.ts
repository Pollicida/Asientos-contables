import axios from "axios";

export const getOneAsiento = async (numero: string) => {
  try {
    const response = await axios.get(`http://localhost:5000/asientos/estado/${numero}`);
    return response.data; // Retorna los datos obtenidos
  } catch (error) {
    console.error("Error al obtener el estado:", error);
    throw error; // Lanza el error para manejarlo en el frontend
  }
};