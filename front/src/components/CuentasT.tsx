import CuentaT from './CuentaT'
import { MayorType } from '../types/MayorType'

const CuentasTComponent = ({ mayorInput }: { mayorInput?: MayorType }) => {
	const mayor = mayorInput	// Aseguramos que los totales sean números
	const totalIzquierdo = Number(mayor?.totalFinalIzquierdo);
	const totalDerecho = Number(mayor?.totalFinalDerecho);
	const diferenciaFinal = Number(mayor?.diferenciaFinal);
	console.log("Hola desde cuentasT", mayorInput);

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
				{mayor?.cuentas.map((cuenta, index) => (
					<CuentaT key={index} cuentaT={cuenta} />
				))}
			</section>
		</div>
	)
}

export default CuentasTComponent;