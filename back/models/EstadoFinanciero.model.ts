import mongoose from "mongoose";

const EstadoFinancieroSchema = new mongoose.Schema({
  fecha: { type: Date, required: true },
  estadoResultados: { type: Object, required: true },
  estadoCambiosCapital: { type: Object, required: true },
  estadoFlujoEfectivo: { type: Object, required: true },
});

export default mongoose.model("EstadoFinanciero", EstadoFinancieroSchema);