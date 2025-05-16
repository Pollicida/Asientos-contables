import { useState, useEffect } from "react";
import BalanceGeneralComponent from "../components/balanceGeneral"
import CuentasTComponent from "../components/CuentasT";
import Balanza from "../components/Balanza";
import { useParams } from "react-router-dom";
import { DataGeneralType } from "../types/DataGeneralType";
import { FormatearFecha } from "../utils/converterFecha";
import generalDataExample from "../utils/DatosEjemplo/generalDataExample";
import { getOneAsiento } from "../api/getOneAsiento";


const Transaccion = () => {
	// 	header: {
	// 		numero: 1,
	// 		descripcion: "Balance General de la empresa tu cama 3B",
	// 		fecha: "2025-03-13",
	// 		tipoAsiento: "General",
	// 	},
	// 	totalActivos: 50000,
	// 	totalPasivos: 20000,
	// 	totalCapital: 30000,
	// 	detalle: {
	// 		activos: [
	// 			{ concepto: "Caja", valor: 10000 },
	// 			{ concepto: "Bancos", valor: 20000 },
	// 			{ concepto: "Inventarios", valor: 20000 },
	// 		],
	// 		pasivos: [
	// 			{ concepto: "Cuentas por pagar", valor: 10000 },
	// 			{ concepto: "Préstamos bancarios", valor: 10000 },
	// 		],
	// 		capital: [{ concepto: "Capital social", valor: 30000 }],
	// 	},
	// };

	// const mayorData = {
	// 	totalFinalIzquierdo: 1000,
	// 	totalFinalDerecho: 500,
	// 	diferenciaFinal: 500,
	// 	cuentas: [
	// 		{
	// 			cuenta: 'Cuenta 1',
	// 			movimientos: [
	// 				{ numeroAsiento: 1, aumento: true, valor: 200 },
	// 				{ numeroAsiento: 2, aumento: false, valor: 100 }
	// 			],
	// 			totalIzquierdo: 300,
	// 			totalDerecho: 200,
	// 			Total: 500,
	// 			fueAfectada: true
	// 		},
	// 		{
	// 			cuenta: 'Cuenta 2',
	// 			movimientos: [
	// 				{ numeroAsiento: 3, aumento: true, valor: 400 }
	// 			],
	// 			totalIzquierdo: 500,
	// 			totalDerecho: 100,
	// 			Total: -600,
	// 			fueAfectada: false
	// 		},
	// 		{
	// 			cuenta: 'Cuenta 3',
	// 			movimientos: [
	// 				{ numeroAsiento: 1, aumento: true, valor: 400 },
	// 				{ numeroAsiento: 2, aumento: true, valor: 400 },
	// 				{ numeroAsiento: 3, aumento: false, valor: 400 },
	// 				{ numeroAsiento: 4, aumento: true, valor: 400 },
	// 				{ numeroAsiento: 5, aumento: false, valor: 400 },
	// 			],
	// 			totalIzquierdo: 500,
	// 			totalDerecho: 100,
	// 			Total: 600,
	// 			fueAfectada: true
	// 		},
	// 		{
	// 			cuenta: 'Cuenta 1',
	// 			movimientos: [
	// 				{ numeroAsiento: 1, aumento: true, valor: 200 },
	// 				{ numeroAsiento: 2, aumento: false, valor: 100 }
	// 			],
	// 			totalIzquierdo: 300,
	// 			totalDerecho: 200,
	// 			Total: 500,
	// 			fueAfectada: true
	// 		},
	// 		{
	// 			cuenta: 'Cuenta 1',
	// 			movimientos: [
	// 				{ numeroAsiento: 1, aumento: true, valor: 200 },
	// 				{ numeroAsiento: 2, aumento: false, valor: 100 }
	// 			],
	// 			totalIzquierdo: 300,
	// 			totalDerecho: 200,
	// 			Total: 500,
	// 			fueAfectada: true
	// 		},
	// 		{
	// 			cuenta: 'Cuenta 1',
	// 			movimientos: [
	// 				{ numeroAsiento: 1, aumento: true, valor: 200 },
	// 				{ numeroAsiento: 2, aumento: false, valor: 100 }
	// 			],
	// 			totalIzquierdo: 300,
	// 			totalDerecho: 200,
	// 			Total: 500,
	// 			fueAfectada: true
	// 		},
	// 		{
	// 			cuenta: 'Cuenta 1',
	// 			movimientos: [
	// 				{ numeroAsiento: 1, aumento: true, valor: 200 },
	// 				{ numeroAsiento: 2, aumento: false, valor: 100 }
	// 			],
	// 			totalIzquierdo: 300,
	// 			totalDerecho: 200,
	// 			Total: 500,
	// 			fueAfectada: true
	// 		},
	// 		{
	// 			cuenta: 'Cuenta 1',
	// 			movimientos: [
	// 				{ numeroAsiento: 1, aumento: true, valor: 200 },
	// 				{ numeroAsiento: 2, aumento: false, valor: 100 }
	// 			],
	// 			totalIzquierdo: 300,
	// 			totalDerecho: 200,
	// 			Total: 500,
	// 			fueAfectada: true
	// 		},
	// 		{
	// 			cuenta: 'Cuenta 1',
	// 			movimientos: [
	// 				{ numeroAsiento: 1, aumento: true, valor: 200 },
	// 				{ numeroAsiento: 2, aumento: false, valor: 100 }
	// 			],
	// 			totalIzquierdo: 300,
	// 			totalDerecho: 200,
	// 			Total: 500,
	// 			fueAfectada: true
	// 		},
	// 		{
	// 			cuenta: 'Cuenta 3',
	// 			movimientos: [
	// 				{ numeroAsiento: 1, aumento: true, valor: 400 },
	// 				{ numeroAsiento: 2, aumento: true, valor: 400 },
	// 				{ numeroAsiento: 3, aumento: false, valor: 400 },
	// 				{ numeroAsiento: 4, aumento: true, valor: 400 },
	// 				{ numeroAsiento: 5, aumento: false, valor: 400 },
	// 			],
	// 			totalIzquierdo: 500,
	// 			totalDerecho: 100,
	// 			Total: 600,
	// 			fueAfectada: true
	// 		},
	// 		{
	// 			cuenta: 'Cuenta 3',
	// 			movimientos: [
	// 				{ numeroAsiento: 1, aumento: true, valor: 400 },
	// 				{ numeroAsiento: 2, aumento: true, valor: 400 },
	// 				{ numeroAsiento: 3, aumento: false, valor: 400 },
	// 				{ numeroAsiento: 4, aumento: true, valor: 400 },
	// 				{ numeroAsiento: 5, aumento: false, valor: 400 },
	// 			],
	// 			totalIzquierdo: 500,
	// 			totalDerecho: 100,
	// 			Total: 600,
	// 			fueAfectada: true
	// 		},
	// 		{
	// 			cuenta: 'Cuenta 3',
	// 			movimientos: [
	// 				{ numeroAsiento: 1, aumento: true, valor: 400 },
	// 				{ numeroAsiento: 2, aumento: true, valor: 400 },
	// 				{ numeroAsiento: 3, aumento: false, valor: 400 },
	// 				{ numeroAsiento: 4, aumento: true, valor: 400 },
	// 				{ numeroAsiento: 5, aumento: false, valor: 400 },
	// 			],
	// 			totalIzquierdo: 500,
	// 			totalDerecho: 100,
	// 			Total: 600,
	// 			fueAfectada: true
	// 		},
	// 		{
	// 			cuenta: 'Cuenta 3',
	// 			movimientos: [
	// 				{ numeroAsiento: 1, aumento: true, valor: 400 },
	// 				{ numeroAsiento: 2, aumento: true, valor: 400 },
	// 				{ numeroAsiento: 3, aumento: false, valor: 400 },
	// 				{ numeroAsiento: 4, aumento: true, valor: 400 },
	// 				{ numeroAsiento: 5, aumento: false, valor: 400 },
	// 			],
	// 			totalIzquierdo: 500,
	// 			totalDerecho: 100,
	// 			Total: 600,
	// 			fueAfectada: true
	// 		}

	// 	]
	// };
	const { asiento } = useParams();
	const [tipo, setTipo] = useState("Balance general")
	const [data, setData] = useState<DataGeneralType>(generalDataExample)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await getOneAsiento(asiento ?? "1");
				setData(res.data);
			} catch (error) {
				console.error("Error al cargar el asiento:", error);
			}
		};
		if (asiento) fetchData();
	}, [asiento]);

	useEffect(() => {
		console.log("Información actualizada: ", data.libroMayor);
	}, [data]);

	if (!data || !data.balanceGeneral || !data.libroMayor) {
		return <div className="flex justify-center items-center h-screen">Cargando...</div>;
	}
	return (
		<div className="h-full min-w-screen flex flex-col">
			<section className="flex-1 w-full overflow-auto">
				{tipo == "Balance general" ? <BalanceGeneralComponent balance={data.balanceGeneral} fecha={FormatearFecha(data.fecha)} />
					: tipo == "Cuentas T" ? <CuentasTComponent mayorInput={data.libroMayor} />
						: <div className="text-black"><Balanza fecha={FormatearFecha(data.fecha)} mayor={data.libroMayor} /></div>
				}
			</section>
			<footer className="px-5 min-h-[35px] bg-gray-200 text-gray-500 flex gap-3" style={{ boxShadow: '0px 0px 10px 1px #989A9C' }}>
				<li onClick={() => (setTipo("Balance general"))} className={`${tipo == "Balance general" && 'bg-gray-100'} cursor-pointer h-full px-2.5  list-none hover:bg-gray-100 active:bg-gray-300 flex items-center ml-6`}>Balance General</li>
				<li onClick={() => (setTipo("Cuentas T"))} className={`${tipo == "Cuentas T" && 'bg-gray-100'} cursor-pointer h-full px-2.5  list-none hover:bg-gray-100 active:bg-gray-300 flex items-center`}>Mayor</li>
				<li onClick={() => (setTipo("Balanza de comprobacion"))} className={`${tipo == "Balanza de comprobacion" && 'bg-gray-100'} cursor-pointer h-full px-2.5  list-none hover:bg-gray-100 active:bg-gray-300 flex items-center`}>Balanza de comprobación</li>
			</footer>
		</div>

	)
}
export default Transaccion