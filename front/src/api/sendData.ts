import axios from "axios";
import { DataGeneralType } from "../types/DataGeneralType";

export const sendData = async (asientos: DataGeneralType) => {
  try {
    const response = await axios.post(`http://localhost:5000/asientos/postAsiento`, asientos, {
      headers: {
        "Content-Type": "application/json",
      }
    });
    return response.data; // Retorna los datos obtenidos
  } catch (error) {
    console.error("Error al insertar datos:", error);
    throw error; // Lanza el error para manejarlo en el frontend
  }
};