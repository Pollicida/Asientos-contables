import { Request, Response } from "express";
import EstadoContable from "../models/Estado.model"; // ajusta la ruta si es diferente

export const obtenerUltimoEstado = async (req: Request, res: Response) => {
  try {
    const ultimoEstado = await EstadoContable.findOne().sort({ fecha: -1 }).lean();

    if (!ultimoEstado) {
      res.status(404).json({ mensaje: "No hay estados contables registrados." });
      return
    }

    res.json({ mensaje: "Último estado contable obtenido correctamente", data: ultimoEstado });
  } catch (error) {
    console.error("Error al obtener el último estado:", error);
    res.status(500).json({ mensaje: "Error interno al obtener el estado contable" });
  }
};


export const obtenerEstadoPorId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const estado = await EstadoContable.findById(id).lean();

    if (!estado) {
      res.status(404).json({ mensaje: "Estado contable no encontrado" });
      return;
    }

    res.json({
      mensaje: "Estado contable encontrado",
      data: estado,
    });

  } catch (error) {
    console.error("Error al obtener estado por id:", error);
    res.status(500).json({ mensaje: "Error interno al obtener estado contable" });
  }
};

export const obtenerUltimosAsientosDeTodosLosEstados = async (req: Request, res: Response) => {
  try {
    // Obtener todos los estados ordenados por fecha ascendente o descendente (según prefieras)
    const estados = await EstadoContable.find().lean();

    if (!estados || estados.length === 0) {
      res.status(404).json({ mensaje: "No se encontraron estados contables." });
      return;
    }

    // Mapear cada estado para extraer último asiento del libro diario
    const ultimosAsientos = estados.map(estado => {
      const libro = estado.libroDiario;

      if (!libro || libro.length === 0) {
        return null; // o podrías filtrar luego estos
      }

      const ultimoAsiento = libro[libro.length - 1];

      return {
        estadoId: estado._id,
        fecha: ultimoAsiento.fecha,
        descripcion: ultimoAsiento.descripcion,
      };
    }).filter(item => item !== null); // eliminar estados sin asientos

    res.json({
      mensaje: "Últimos asientos de todos los estados obtenidos correctamente",
      data: ultimosAsientos,
    });

  } catch (error) {
    console.error("Error al obtener últimos asientos:", error);
    res.status(500).json({ mensaje: "Error interno al obtener los últimos asientos" });
  }
};