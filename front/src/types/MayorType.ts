interface Movimiento {
    numeroAsiento: number,
    aumento: boolean,
    valor: number
}
interface CuentaT {
    cuenta: string,
    movimientos: MovimientoType[],
    totalIzquierdo: number,
    totalDerecho: number,
    total: number,
    fueAfectada: boolean
}

interface Mayor {
    totalFinalIzquierdo: number,
    totalFinalDerecho: number,
    diferenciaFinal: number,
    cuentas: CuentaT[]
}

export type MovimientoType = Movimiento
export type CuentaTType = CuentaT
export type MayorType = Mayor