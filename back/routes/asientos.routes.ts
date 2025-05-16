import { Request, Response, Router } from "express";
import { body, validationResult } from "express-validator";
import { generarYGuardarEstados } from "../controllers/generarEstados.controller";

const router = Router();

router.post(
  "/postAsiento",
  [
    // Validación para el objeto asiento
    body("asiento").exists().withMessage("El asiento es obligatorio"),
    body("asiento.fecha").isString().withMessage("La fecha del asiento es obligatoria"),
    body("asiento.descripcion").isString().withMessage("La descripción del asiento es obligatoria"),
    body("asiento.movimientos").isArray({ min: 1 }).withMessage("Debe haber al menos un movimiento en el asiento"),
    body("asiento.movimientos.*.cuenta").isString().withMessage("La cuenta es obligatoria"),
    body("asiento.movimientos.*.debe").isNumeric().withMessage("Debe debe ser un número"),
    body("asiento.movimientos.*.haber").isNumeric().withMessage("Haber debe ser un número"),
  ],
  async (req: Request, res: Response) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      res.status(400).json({ errores: errores.array() });
      return;
    }
    // Mejor usar await para manejar promesas correctamente
    await generarYGuardarEstados(req, res);
  }
);

export default router;