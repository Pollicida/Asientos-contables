interface DetalleCuenta {
	concepto: string;
	valor: number;
}

interface Balance {
	totalActivos: number;
	totalPasivos: number;
	totalCapital: number;
	detalle: {
		activos: DetalleCuenta[];
		pasivos: DetalleCuenta[];
		capital: DetalleCuenta[];
	};
}
export type BalanceType = Balance