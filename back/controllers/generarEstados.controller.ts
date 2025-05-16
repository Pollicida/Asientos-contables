import { Request, Response } from "express";
import EstadoContable from "../models/Estado.model";
import generarEstadosContables, { AsientoContable } from "../services/contabilidad.service";

// POST /api/generar-estados
export const generarYGuardarEstados = async (req: Request, res: Response) => {
  try {
    const { fecha, asiento } = req.body;

    if (!fecha || !asiento) {
      return res.status(400).json({ error: "Faltan datos: fecha o asiento" });
    }

    // ✅ Obtener el último estado contable (usando _id para ordenar por creación)
    const ultimoEstado = await EstadoContable.findOne().sort({ fecha: -1 }).lean();

    // ✅ Extraer asientos solo del último estado (si existe)
    const asientosPrevios: AsientoContable[] = ultimoEstado?.libroDiario.map(entry => ({
      fecha: entry.fecha,
      descripcion: entry.descripcion,
      movimientos: entry.partidas.map(p => ({
        cuenta: p.cuenta,
        debe: p.debe,
        haber: p.haber
      }))
    })) || [];

    // ➕ Añadir el nuevo asiento
    const todosLosAsientos = [...asientosPrevios, asiento];

    // 🧠 Generar nuevos estados contables
    const estadosActualizados = generarEstadosContables(fecha, todosLosAsientos);

    // 💾 Guardar nuevo estado contable
    const nuevoDocumento = new EstadoContable(estadosActualizados);
    await nuevoDocumento.save();

    // ✅ Enviar respuesta
    res.status(201).json({
      mensaje: "Estados contables actualizados y guardados correctamente",
      data: nuevoDocumento,
    });
  } catch (error) {
    console.error("Error al generar o guardar estados contables:", error);
    res.status(500).json({ error: "Error del servidor" });
  }
};