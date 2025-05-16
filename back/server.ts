import express, { Application, Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import asientoRouter from "./routes/asientos.routes"; // Asegúrate del nombre y extensión

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "";

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.get("/", (_req: Request, res: Response) => {
  res.send("API funcionando");
});

app.use("/asientos", asientoRouter)
// Conexión a MongoDB y levantar servidor
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB conectado");
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Error de conexión a MongoDB:", err);
  });