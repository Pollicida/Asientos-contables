import { MayorType } from "../types/MayorType";
import { CuentaAfectadaType } from "../types/CuentaAfectadaType";

//"Mayor Anterior" Ejemplo
const mayorEjemplo: MayorType = {
  totalFinalIzquierdo: 1000,
  totalFinalDerecho: 1000,
  diferenciaFinal: 0,
  cuentas: [
    {
      cuenta: "Caja",
      movimientos: [
        { numeroAsiento: 1, aumento: true, valor: 500 }
      ],
      totalIzquierdo: 500,
      totalDerecho: 0,
      total: 500,
      fueAfectada: true,
    },
    {
      cuenta: "Banco",
      movimientos: [
        { numeroAsiento: 1, aumento: true, valor: 1000 }
      ],
      totalIzquierdo: 1000,
      totalDerecho: 0,
      total: 1000,
      fueAfectada: true,
    },
    {
      cuenta: "Capital",
      movimientos: [
        { numeroAsiento: 1, aumento: false, valor: 1500 }
      ],
      totalIzquierdo: 0,
      totalDerecho: 1500,
      total: -1500,
      fueAfectada: true,
    }
  ]
};

const cuentasAfectadasEjemplo: CuentaAfectadaType[] = [
  { concepto: "Caja", debe: 1000, haber: 0 },
  { concepto: "Banco", debe: 0, haber: 500 },
  { concepto: "Inventario", debe: 2000, haber: 0 },
  { concepto: "Cuentas por Pagar", debe: 0, haber: 2500 },
];

//TODO: Armar arreglo actual

const generarCuentasT = (numeroAsiento: number, cuentasAfectadasInput: CuentaAfectadaType[], mayorAnterior?: MayorType) => {
  const mayor: MayorType = mayorAnterior || mayorEjemplo;
  const cuentasAfectadas = cuentasAfectadasInput || cuentasAfectadasEjemplo;

  // Restaurar el estado de las cuentas modificadas
  mayor.cuentas.forEach(cuenta => {
    cuenta.fueAfectada = false;
  });

  for (let i = 0; i < cuentasAfectadas.length; i++) {
    let cuentaExistente = mayor.cuentas.find(cuenta => cuenta.cuenta === cuentasAfectadas[i].concepto);

    if (cuentaExistente) {
      // Si la cuenta modificada ya se encuentra en el mayor
      // Cambiar el estado a true
      cuentaExistente.fueAfectada = true;
      // Empujar el estado
      cuentaExistente.movimientos.push({
        numeroAsiento: numeroAsiento,
        aumento: cuentasAfectadas[i].debe > 0,
        valor: cuentasAfectadas[i].debe > 0 ? cuentasAfectadas[i].debe : cuentasAfectadas[i].haber,
      });

      // Calcular nuevamente los totales
      cuentaExistente.totalIzquierdo = cuentaExistente.movimientos
        .filter(mov => mov.aumento)
        .reduce((sum, mov) => sum + Math.round(Number(mov.valor)), 0);

      cuentaExistente.totalDerecho = cuentaExistente.movimientos
        .filter(mov => !mov.aumento)
        .reduce((sum, mov) => sum + Math.round(Number(mov.valor)), 0);

      cuentaExistente.total = Math.round(cuentaExistente.totalIzquierdo - cuentaExistente.totalDerecho);
    } else {
      // Si la cuenta no existe en el mayor, se crea una nueva
      mayor.cuentas.push({
        cuenta: cuentasAfectadas[i].concepto,
        movimientos: [{
          numeroAsiento: numeroAsiento,
          aumento: cuentasAfectadas[i].debe > 0,
          valor: cuentasAfectadas[i].debe > 0 ? cuentasAfectadas[i].debe : cuentasAfectadas[i].haber,
        }],
        totalIzquierdo: Math.round(cuentasAfectadas[i].debe > 0 ? cuentasAfectadas[i].debe : 0),
        totalDerecho: Math.round(cuentasAfectadas[i].haber > 0 ? cuentasAfectadas[i].haber : 0),
        total: Math.round(cuentasAfectadas[i].debe - cuentasAfectadas[i].haber),
        fueAfectada: true,
      });
    }
  }

  // Total final del lado derecho y el total final del lado izquierdo
  mayor.totalFinalIzquierdo = Math.round(mayor.cuentas.reduce((sum, cuenta) => sum + Math.round(cuenta.totalIzquierdo), 0));
  mayor.totalFinalDerecho = Math.round(mayor.cuentas.reduce((sum, cuenta) => sum + Math.round(cuenta.totalDerecho), 0));
  mayor.diferenciaFinal = Math.round(mayor.totalFinalIzquierdo - mayor.totalFinalDerecho);

  return mayor;
}

export default generarCuentasT;