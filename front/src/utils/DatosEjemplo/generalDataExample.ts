import { DataGeneralType } from "../../types/DataGeneralType"

const generalDataExample: DataGeneralType = {
	dataHeader: {
		numero: 0,
		descripcion: "",
		fecha: "",
		tipoAsiento: "",
	},
	asiento: [],
	mayor: {
		totalFinalIzquierdo: 0,
		totalFinalDerecho: 0,
		diferenciaFinal: 0,
		cuentas: [],
	},
	balance: {
		totalActivos: 0,
		totalPasivos: 0,
		totalCapital: 0,
		detalle: {
			activos: [],
			pasivos: [],
			capital: [],
		},
	},
};

export default generalDataExample