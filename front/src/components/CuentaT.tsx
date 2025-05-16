import { CuentaTType } from "../types/MayorType"

const CuentaT = ({ cuentaT }: { cuentaT: CuentaTType }) => {
	const movIzquierdo = cuentaT.movimientos.filter(mov => mov.aumento)
	const movDerecho = cuentaT.movimientos.filter(mov => !mov.aumento)
	const numeroFilas = Math.max(movIzquierdo.length, movDerecho.length)
	const isPositive = cuentaT.total > 0;

	return (
		<table className="border-[2px] border-gray-300 w-[280px]">
			<thead className={`${cuentaT.fueAfectada ? 'bg-gray-300' : 'bg-gray-200'} border-b-[2px] border-b-slate-500`}>
				<tr>
					<th></th>
					<th colSpan={2} className="py-2">{cuentaT.cuenta}</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				{Array.from({ length: numeroFilas }, (_, index) => (
					<tr key={index}>
						<td className="py-1 px-3 border border-gray-300 w-[40px] text-end">{movIzquierdo[index] && movIzquierdo[index].numeroAsiento}</td>
						<td className={`py-1 px-3 border border-gray-300 w-[100px] text-end border-r-[2px] border-r-slate-500 ${movIzquierdo[index] && 'bg-green-200'}`}>{movIzquierdo[index] && `$ ${movIzquierdo[index].valor}`}</td>
						<td className={`py-1 px-3 border border-gray-300 w-[100px] text-end ${movDerecho[index] && 'bg-red-300'}`}>{movDerecho[index] && `$ ${movDerecho[index].valor}`}</td>
						<td className="py-1 px-3 border border-gray-300 w-[40px]">{movDerecho[index] && movDerecho[index].numeroAsiento}</td>
					</tr>
				))}
				<tr>
					<td colSpan={2} className="py-1 border-r-[2px] border-r-slate-500 text-white">.</td>
				</tr>
			</tbody>
			<tfoot className="border-t-[2px] border-t-slate-600">
				<tr>
					<td className="border border-gray-300"></td>
					<td className="py-1 px-3 border border-gray-300 text-end bg-green-200">{`$ ${cuentaT.movimientos.filter(mov => mov.aumento).reduce((sum, mov) =>  sum + mov.valor, 0)}`}</td>
					<td className="py-1 px-3 border border-gray-300 text-end bg-red-300">{`$ ${cuentaT.movimientos.filter(mov => !mov.aumento).reduce((sum, mov) => sum + mov.valor, 0)}`}</td>
					<td className="border border-gray-300"></td>
				</tr>
				<tr>
					<td className="py-1 px-3 border border-gray-300 text-end" colSpan={2}>Diferencia</td>
					<td className={`py-1 px-3 border border-gray-300 text-center ${isPositive ? 'bg-green-200' : 'bg-red-300'}`} colSpan={2}>$ {Math.abs(cuentaT.total)}</td>
				</tr>
			</tfoot>

		</table>
	)
}

export default CuentaT