import { BalanceType } from "../types/BalanceType";

const balanceInicial: BalanceType = {
	totalActivos: 0,
	totalPasivos: 0,
	totalCapital: 0,
	detalle: {
		activos: [],
		pasivos: [],
		capital: [],
	},
};
export default balanceInicial