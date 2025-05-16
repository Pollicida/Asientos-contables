import { Request, Response } from "express";
import EstadoContable from "../models/Estado.model";
import EstadoFinanciero from "../models/EstadoFinanciero.model";

// Función para generar estado de resultados
const generarEstadoResultados = (asientos: any[]) => {
  let totalIngresos = 0;
  let totalCostos = 0;
  let totalGastos = 0;

  asientos.forEach(asiento => {
    asiento.partidas.forEach((partida: any) => {
      const { cuenta, debe, haber } = partida;

      if (cuenta.toLowerCase().includes("venta")) {
        totalIngresos += haber;
      } else if (cuenta.toLowerCase().includes("costo de lo vendido")) {
        totalCostos += debe;
      } else if (
        cuenta.toLowerCase().includes("gasto") ||
        cuenta.toLowerCase().includes("papelería") ||
        cuenta.toLowerCase().includes("renta")
      ) {
        totalGastos += debe;
      }
    });
  });

  const utilidadBruta = totalIngresos - totalCostos;
  const utilidadNeta = utilidadBruta - totalGastos;

  return {
    ingresos: totalIngresos,
    costos: totalCostos,
    gastos: totalGastos,
    utilidadBruta,
    utilidadNeta,
  };
};

// Función para generar flujo de efectivo directo
const generarFlujoEfectivo = (asientos: any[]) => {
  let efectivoOperacion = 0;
  let efectivoInversion = 0;
  let efectivoFinanciamiento = 0;

  asientos.forEach(asiento => {
    asiento.partidas.forEach((p: any) => {
      const cuenta = p.cuenta.toLowerCase();

      // Flujo de operación
      if (
        cuenta.includes("ventas") ||
        cuenta.includes("clientes") ||
        cuenta.includes("anticipo cliente") ||
        cuenta.includes("caja") ||
        cuenta.includes("banco")
      ) {
        efectivoOperacion += (p.haber ?? 0) - (p.debe ?? 0);
      }

      // Inversión
      if (
        cuenta.includes("maquinaria") ||
        cuenta.includes("edificio") ||
        cuenta.includes("terreno")
      ) {
        efectivoInversion += (p.haber ?? 0) - (p.debe ?? 0);
      }

      // Financiamiento
      if (
        cuenta.includes("capital") ||
        cuenta.includes("acreedores") ||
        cuenta.includes("documentos por pagar")
      ) {
        efectivoFinanciamiento += (p.haber ?? 0) - (p.debe ?? 0);
      }
    });
  });

  const totalFlujo = efectivoOperacion + efectivoInversion + efectivoFinanciamiento;

  return {
    efectivoOperacion,
    efectivoInversion,
    efectivoFinanciamiento,
    totalFlujo,
  };
};

// Función para generar cambios en el capital contable
const generarCambiosCapital = (asientos: any[]) => {
  let capitalInicial = 0;
  let aportaciones = 0;
  let utilidadNeta = 0;

  asientos.forEach(asiento => {
    asiento.partidas.forEach((p: any) => {
      const cuenta = p.cuenta.toLowerCase();

      if (cuenta.includes("capital")) {
        aportaciones += p.haber ?? 0;
      }
    });
  });

  capitalInicial = aportaciones;
  const resultados = generarEstadoResultados(asientos);
  utilidadNeta = resultados.utilidadNeta;

  const capitalFinal = capitalInicial + utilidadNeta;

  return {
    capitalInicial,
    aportaciones,
    utilidadNeta,
    capitalFinal,
  };
};

// Función principal para generar y guardar todos los estados financieros
export const generarEstadosFinancieros = async (req: Request, res: Response) => {
  try {
    const estadosContables = await EstadoContable.find().sort({ fecha: 1 });

    if (estadosContables.length === 0) {
      res.status(404).json({ mensaje: "No hay estados contables disponibles." });
      return;
    }

    const todosAsientos = estadosContables.flatMap((estado) => estado.libroDiario);
    const fechaFinal = estadosContables[estadosContables.length - 1].fecha;

    const estadoResultados = generarEstadoResultados(todosAsientos);
    const estadoCambiosCapital = generarCambiosCapital(todosAsientos);
    const estadoFlujoEfectivo = generarFlujoEfectivo(todosAsientos);

    const nuevoEstado = new EstadoFinanciero({
      fecha: fechaFinal,
      estadoResultados,
      estadoCambiosCapital,
      estadoFlujoEfectivo,
    });

    await nuevoEstado.save();

    res.status(201).json({
      mensaje: "Estados financieros generados correctamente",
      data: nuevoEstado,
    });

  } catch (error) {
    console.error("Error al generar estados financieros:", error);
    res.status(500).json({ mensaje: "Error interno del servidor", error });
  }
};