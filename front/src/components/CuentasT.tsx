import CuentaT from './CuentaT'
import { MayorType } from '../types/MayorType'

//"Mayor Anterior" Ejemplo
const mayorEjemplo: MayorType = {
	totalFinalIzquierdo: 1000,  // Aseguramos que sea un número
	totalFinalDerecho: 1000,    // Aseguramos que sea un número
	diferenciaFinal: 0,         // Aseguramos que sea un número
	cuentas: [
		{
			cuenta: "Caja",
			movimientos: [
				{ numeroAsiento: 1, aumento: true, valor: 500 }
			],
			totalIzquierdo: 500, // Aseguramos que sea un número
			totalDerecho: 0,     // Aseguramos que sea un número
			total: 500,          // Aseguramos que sea un número
			fueAfectada: true,
		},
		{
			cuenta: "Banco",
			movimientos: [
				{ numeroAsiento: 1, aumento: true, valor: 1000 }
			],
			totalIzquierdo: 1000, // Aseguramos que sea un número
			totalDerecho: 0,      // Aseguramos que sea un número
			total: 1000,          // Aseguramos que sea un número
			fueAfectada: true,
		},
		{
			cuenta: "Capital",
			movimientos: [
				{ numeroAsiento: 1, aumento: false, valor: 1500 }
			],
			totalIzquierdo: 0,     // Aseguramos que sea un número
			totalDerecho: 1500,    // Aseguramos que sea un número
			total: -1500,          // Aseguramos que sea un número
			fueAfectada: true,
		},
	]
};

const CuentasTComponent = ({ mayorInput }: { mayorInput?: MayorType }) => {
	const mayor = mayorInput || mayorEjemplo;
	// Aseguramos que los totales sean números
	const totalIzquierdo = Number(mayor.totalFinalIzquierdo);
	const totalDerecho = Number(mayor.totalFinalDerecho);
	const diferenciaFinal = Number(mayor.diferenciaFinal);

	return (
		<div className='h-full w-full flex flex-col p-3 items-center'>
			<table className='w-[80%] rounded-2xl'>
				<tbody>
					<tr className='rounded-2xl' style={{ boxShadow: '0px 0px 5px 1px #989A9C' }}>
						<td className='bg-green-200 px-4 text-lg py-1.5 rounded-l-2xl border-r-2 border-r-gray-300'>Total Izquierdo</td>
						<td className='bg-green-200 px-4'>$ {totalIzquierdo}</td>
						<td className='bg-red-300 px-4 text-lg border-r-2 border-r-gray-300'>Total Derecho</td>
						<td className='bg-red-300 px-4'>$ {totalDerecho}</td>
						<td className='px-4 text-lg border-r-2 border-r-gray-300'>Diferencia Final</td>
						<td className='px-4 rounded-r-2xl'>$ {diferenciaFinal}</td>
					</tr>
				</tbody>
			</table>
			<section className='w-full flex p-5 gap-x-3 gap-y-[50px] flex-wrap justify-center'>
				{mayor.cuentas.map((cuenta, index) => (
					<CuentaT key={index} cuentaT={cuenta} />
				))}
			</section>
		</div>
	)
}

export default CuentasTComponent;