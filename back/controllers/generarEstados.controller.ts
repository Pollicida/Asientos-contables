import EstadoContable from "../models/Estado.model";
import generarEstadosContables from "../services/contabilidad.service";
import { Request, Response } from "express";

export const generarYGuardarEstados = async (req: Request, res: Response) => {
  try {
    const { asiento } = req.body;

    if (!asiento) {
      return res.status(400).json({ error: "Faltan datos: Asiento" });
    }

    // 1. Obtener todos los estados contables previos de la BD ordenados por fecha (ascendente)
    const estadosPrevios = await EstadoContable.find().sort({ fecha: 1 });

    // 2. Extraer todos los asientos previos desde el libroDiario de cada estado
    const asientosPrevios = estadosPrevios.flatMap((estado) =>
      estado.libroDiario.map((entry) => ({
        fecha: entry.fecha,
        descripcion: entry.descripcion,
        movimientos: entry.partidas.map((p) => ({
          cuenta: p.cuenta,
          debe: p.debe,
          haber: p.haber,
        })),
      }))
    );
    // 3. Combinar todos los asientos previos con el nuevo asiento recibido
    const asientosCompletos = [...asientosPrevios, asiento];

    // 4. Generar todos los estados contables (pasar la fecha del nuevo asiento y todos los asientos)
    const estados = generarEstadosContables(asiento.fecha, asientosCompletos);

    // 5. Guardar el nuevo estado completo en la BD
    const nuevoDocumento = new EstadoContable({
      fecha: asiento.fecha,
      libroDiario: estados.libroDiario,
      libroMayor: estados.libroMayor,
      balanzaDeComprobacion: estados.balanzaDeComprobacion,
      balanceGeneral: estados.balanceGeneral,
    });

    await nuevoDocumento.save();

    // 6. Responder con el nuevo estado contable guardado
    res.status(201).json({
      mensaje: "Estados contables generados y guardados correctamente",
      data: nuevoDocumento,
    });
  } catch (error) {
    console.error("Error al generar o guardar estados contables:", error);
    res.status(500).json({ error: "Error del servidor" });
  }
};