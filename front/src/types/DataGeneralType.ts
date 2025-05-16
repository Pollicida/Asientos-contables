import { DataHeaderType } from "./DataHeaderType";
import { AsientoType } from "./AsientosType";
import { MayorType } from "./MayorType";
import { BalanceType } from "./BalanceType";

interface DataGeneral {
    dataHeader: DataHeaderType,
    asiento: AsientoType,
    mayor: MayorType,
    balance: BalanceType
}

type DatasGenerales = DataGeneral[]

export type DataGeneralType = DataGeneral
export type DatasGeneralesType = DatasGenerales