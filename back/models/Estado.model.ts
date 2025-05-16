import mongoose, { Schema, Document, Model } from "mongoose";

// Interfaces
interface Movimiento {
  cuenta: string;
  debe: number;
  haber: number;
}

interface AsientoContable {
  fecha: string;
  descripcion: string;
  movimientos: Movimiento[];
}

interface LibroDiarioEntry {
  fecha: string;
  descripcion: string;
  partidas: Movimiento[];
}

interface MovimientoMayor {
  numeroAsiento: number;
  aumento: boolean;
  valor: number;
}

interface CuentaMayor {
  cuenta: string;
  movimientos: MovimientoMayor[];
  totalIzquierdo: number;
  totalDerecho: number;
  total: number;
  fueAfectada: boolean;
}

interface RegistroBalanza {
  cuenta: string;
  movimientosDebe: number;
  movimientosHaber: number;
  saldoDebe: number;
  saldoHaber: number;
}

interface CuentaBalance {
  concepto: string;
  valor: number;
}

interface IEstadoContable extends Document {
  fecha: string;
  libroDiario: LibroDiarioEntry[];
  libroMayor: {
    totalFinalIzquierdo: number;
    totalFinalDerecho: number;
    diferenciaFinal: number;
    cuentas: CuentaMayor[];
  };
  balanzaDeComprobacion: {
    fecha: string;
    registros: RegistroBalanza[];
    totalMovimientosDebe: number;
    totalMovimientosHaber: number;
    totalSaldosDebe: number;
    totalSaldosHaber: number;
  };
  balanceGeneral: {
    detalle: {
      activos: CuentaBalance[];
      pasivos: CuentaBalance[];
      capital: CuentaBalance[];
    };
    totalActivos: number;
    totalPasivos: number;
    totalCapital: number;
  };
}

// Schema
const estadoContableSchema = new Schema<IEstadoContable>({
  fecha: { type: String, required: true },
  libroDiario: [
    {
      fecha: { type: String, required: true },
      descripcion: { type: String, required: true },
      partidas: [
        {
          cuenta: { type: String, required: true },
          debe: { type: Number, required: true },
          haber: { type: Number, required: true },
        },
      ],
    },
  ],
  libroMayor: {
    totalFinalIzquierdo: { type: Number, required: true },
    totalFinalDerecho: { type: Number, required: true },
    diferenciaFinal: { type: Number, required: true },
    cuentas: [
      {
        cuenta: { type: String, required: true },
        movimientos: [
          {
            numeroAsiento: { type: Number, required: true },
            aumento: { type: Boolean, required: true },
            valor: { type: Number, required: true },
          },
        ],
        totalIzquierdo: { type: Number, required: true },
        totalDerecho: { type: Number, required: true },
        total: { type: Number, required: true },
        fueAfectada: { type: Boolean, required: true },
      },
    ],
  },
  balanzaDeComprobacion: {
    fecha: { type: String, required: true },
    registros: [
      {
        cuenta: { type: String, required: true },
        movimientosDebe: { type: Number, required: true },
        movimientosHaber: { type: Number, required: true },
        saldoDebe: { type: Number, required: true },
        saldoHaber: { type: Number, required: true },
      },
    ],
    totalMovimientosDebe: { type: Number, required: true },
    totalMovimientosHaber: { type: Number, required: true },
    totalSaldosDebe: { type: Number, required: true },
    totalSaldosHaber: { type: Number, required: true },
  },
  balanceGeneral: {
    detalle: {
      activos: [
        {
          concepto: { type: String, required: true },
          valor: { type: Number, required: true },
        },
      ],
      pasivos: [
        {
          concepto: { type: String, required: true },
          valor: { type: Number, required: true },
        },
      ],
      capital: [
        {
          concepto: { type: String, required: true },
          valor: { type: Number, required: true },
        },
      ],
    },
    totalActivos: { type: Number, required: true },
    totalPasivos: { type: Number, required: true },
    totalCapital: { type: Number, required: true },
  },
});

// Indexes (opcional)
estadoContableSchema.index({ fecha: 1 });

// Model export
const EstadoContable: Model<IEstadoContable> = mongoose.model("EstadoContable", estadoContableSchema);
export default EstadoContable;
