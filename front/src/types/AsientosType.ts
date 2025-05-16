interface Cuenta {
    concepto: string,
    debe: number,
    haber: number
}
type Asiento = Cuenta[]

export type CuentaType = Cuenta
export type AsientoType = Asiento