// ---------- Tipos Unificados ----------

export type Movimiento = {
  cuenta: string;
  debe: number;
  haber: number;
};

export type AsientoContable = {
  fecha: string;
  descripcion: string;
  movimientos: Movimiento[];
};

export type LibroDiarioEntry = {
  fecha: string;
  descripcion: string;
  partidas: Movimiento[];
};

export type MovimientoMayor = {
  numeroAsiento: number;
  aumento: boolean;
  valor: number;
};

export type CuentaMayor = {
  cuenta: string;
  movimientos: MovimientoMayor[];
  totalIzquierdo: number;
  totalDerecho: number;
  total: number;
  fueAfectada: boolean;
};

export type LibroMayor = {
  totalFinalIzquierdo: number;
  totalFinalDerecho: number;
  diferenciaFinal: number;
  cuentas: CuentaMayor[];
};

export type RegistroBalanza = {
  cuenta: string;
  movimientosDebe: number;
  movimientosHaber: number;
  saldoDebe: number;
  saldoHaber: number;
};

export type BalanzaDeComprobacion = {
  fecha: string;
  registros: RegistroBalanza[];
  totalMovimientosDebe: number;
  totalMovimientosHaber: number;
  totalSaldosDebe: number;
  totalSaldosHaber: number;
};

export type CuentaBalance = {
  concepto: string;
  valor: number;
};

export type BalanceGeneral = {
  detalle: {
    activos: CuentaBalance[];
    pasivos: CuentaBalance[];
    capital: CuentaBalance[];
  };
  totalActivos: number;
  totalPasivos: number;
  totalCapital: number;
};

// ---------- Funciones ----------

export const generarLibroDiario = (asientos: AsientoContable[]): LibroDiarioEntry[] => {
  return asientos.map(asiento => ({
    fecha: asiento.fecha,
    descripcion: asiento.descripcion,
    partidas: asiento.movimientos.map(m => ({
      cuenta: m.cuenta,
      debe: Number(m.debe || 0),
      haber: Number(m.haber || 0)
    }))
  }));
};

export const generarLibroMayor = (
  asientos: AsientoContable[],
  mayorAnterior?: LibroMayor
): LibroMayor => {
  let mayor: LibroMayor = mayorAnterior || {
    totalFinalIzquierdo: 0,
    totalFinalDerecho: 0,
    diferenciaFinal: 0,
    cuentas: []
  };

  asientos.forEach((asiento, i) => {
    mayor.cuentas.forEach(c => (c.fueAfectada = false));
    asiento.movimientos.forEach(({ cuenta, debe, haber }) => {
      const valor = debe > 0 ? debe : haber;
      const aumento = debe > 0;

      let cuentaMayor = mayor.cuentas.find(c => c.cuenta === cuenta);
      if (!cuentaMayor) {
        cuentaMayor = {
          cuenta,
          movimientos: [],
          totalIzquierdo: 0,
          totalDerecho: 0,
          total: 0,
          fueAfectada: true
        };
        mayor.cuentas.push(cuentaMayor);
      }

      cuentaMayor.fueAfectada = true;
      cuentaMayor.movimientos.push({ numeroAsiento: i + 1, aumento, valor });

      cuentaMayor.totalIzquierdo = cuentaMayor.movimientos
        .filter(m => m.aumento)
        .reduce((s, m) => s + m.valor, 0);

      cuentaMayor.totalDerecho = cuentaMayor.movimientos
        .filter(m => !m.aumento)
        .reduce((s, m) => s + m.valor, 0);

      cuentaMayor.total = cuentaMayor.totalIzquierdo - cuentaMayor.totalDerecho;
    });
  });

  mayor.totalFinalIzquierdo = mayor.cuentas.reduce((s, c) => s + c.totalIzquierdo, 0);
  mayor.totalFinalDerecho = mayor.cuentas.reduce((s, c) => s + c.totalDerecho, 0);
  mayor.diferenciaFinal = mayor.totalFinalIzquierdo - mayor.totalFinalDerecho;

  return mayor;
};

export const generarBalanzaDeComprobacion = (fecha: string, mayor: LibroMayor): BalanzaDeComprobacion => {
  const registros = mayor.cuentas.map(cuenta => ({
    cuenta: cuenta.cuenta,
    movimientosDebe: cuenta.totalIzquierdo,
    movimientosHaber: cuenta.totalDerecho,
    saldoDebe: cuenta.total > 0 ? cuenta.total : 0,
    saldoHaber: cuenta.total < 0 ? Math.abs(cuenta.total) : 0
  }));

  return {
    fecha,
    registros,
    totalMovimientosDebe: registros.reduce((s, r) => s + r.movimientosDebe, 0),
    totalMovimientosHaber: registros.reduce((s, r) => s + r.movimientosHaber, 0),
    totalSaldosDebe: registros.reduce((s, r) => s + r.saldoDebe, 0),
    totalSaldosHaber: registros.reduce((s, r) => s + r.saldoHaber, 0)
  };
};

const esActivo = (concepto: string) =>
  ["iva acreditable", "caja", "banco", "maquinaria", "terreno", "edificio", "clientes", "inventario",  "iva por acreditar", "materia prima", "materia en proceso", "producto terminado", "papelería", "pagos anticipados", "rentas pagadas por anticipado"]
    .some(c => concepto.toLowerCase().includes(c));
const esPasivo = (concepto: string) =>
  ["acreedores", "proveedores", "documentos por pagar", "anticipo cliente", "iva trasladado", "iva x trasladar"]
    .some(c => concepto.toLowerCase().includes(c));
const esCapital = (concepto: string) =>
  ["capital", "utilidad del ejercicio", "ventas", "costos", "gastos"]
    .some(c => concepto.toLowerCase().includes(c));

export const generarBalanceGeneral = (cuentas: Movimiento[]): BalanceGeneral => {
  const balance: BalanceGeneral = {
    detalle: { activos: [], pasivos: [], capital: [] },
    totalActivos: 0,
    totalPasivos: 0,
    totalCapital: 0
  };

  cuentas.forEach(({ cuenta: concepto, debe, haber }) => {
    const valor = debe - haber;
    const tipo = esActivo(concepto) ? "activos" : esPasivo(concepto) ? "pasivos" : "capital";
    const lista = balance.detalle[tipo];

    const existente = lista.find(c => c.concepto === concepto);
    if (existente) existente.valor += valor;
    else lista.push({ concepto, valor });
  });

  for (const tipo of ["activos", "pasivos", "capital"] as const) {
    balance.detalle[tipo] = balance.detalle[tipo].filter(c => c.valor !== 0);
  }

  balance.totalActivos = balance.detalle.activos.reduce((s, c) => s + c.valor, 0);
  balance.totalPasivos = balance.detalle.pasivos.reduce((s, c) => s + c.valor, 0);
  balance.totalCapital = balance.detalle.capital.reduce((s, c) => s + c.valor, 0);

  return balance;
};

const generarEstadosContables = (
  fecha: string,
  asientos: AsientoContable[]
) => {
  const libroDiario = generarLibroDiario(asientos);
  const libroMayor = generarLibroMayor(asientos);
  const balanza = generarBalanzaDeComprobacion(fecha, libroMayor);
  const movimientosParaBalance = asientos.flatMap(a => a.movimientos);
  const balance = generarBalanceGeneral(movimientosParaBalance);

  return {
    fecha,
    libroDiario,
    libroMayor,
    balanzaDeComprobacion: balanza,
    balanceGeneral: balance
  };
};
export default generarEstadosContables;