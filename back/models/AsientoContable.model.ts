import mongoose, { Schema, Document, Model } from "mongoose";

interface Movimiento {
  cuenta: string;
  debe: number;
  haber: number;
}

interface IAsientoContable extends Document {
  fecha: string;
  descripcion: string;
  movimientos: Movimiento[];
}

const asientoContableSchema = new Schema<IAsientoContable>({
  fecha: { type: String, required: true },
  descripcion: { type: String, required: true },
  movimientos: [
    {
      cuenta: { type: String, required: true },
      debe: { type: Number, required: true },
      haber: { type: Number, required: true },
    },
  ],
});

const AsientoContable: Model<IAsientoContable> = mongoose.model("AsientoContable", asientoContableSchema);
export default AsientoContable;