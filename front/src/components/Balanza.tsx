import { MayorType } from "../types/MayorType"

const Balanza = ({ fecha, mayor }: { fecha: string, mayor: MayorType }) => {
	return (
		<div className="h-full w-full flex flex-col items-center p-4">
			<table className="w-full max-w-4xl border border-gray-300 shadow-md overflow-hidden">
				<thead className="bg-gray-200 text-gray-700">
					<tr>
						<td colSpan={5} className="text-center font-semibold p-2">Tu cama 3B</td>
					</tr>
					<tr>
						<td colSpan={5} className="text-center font-semibold p-2">Balanza de comprobación al {fecha}</td>
					</tr>
					<tr className="border-b border-gray-300">
						<td className="p-2"></td>
						<td colSpan={2} className="p-2 text-center font-medium">Movimientos</td>
						<td colSpan={2} className="p-2 text-center font-medium">Saldos</td>
					</tr>
					<tr className="border-b border-gray-300">
						<td className="p-2 font-medium text-left px-6 border-r-[1px] border-r-gray-300">Cuenta</td>
						<td className="p-2 font-medium text-right">Debe</td>
						<td className="p-2 font-medium text-right">Haber</td>
						<td className="p-2 font-medium text-right">Debe</td>
						<td className="p-2 font-medium text-right">Haber</td>
					</tr>
				</thead>
				<tbody>
					{mayor.cuentas.map((cuenta, index) => (
						<tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
							<td className="p-2 bg-green-200 px-6 border-r-[1px] border-r-gray-300">{cuenta.cuenta}</td>
							<td className="p-2 text-right bg-green-200">$ {Number(cuenta.totalIzquierdo).toLocaleString()}</td>
							<td className="p-2 text-right bg-red-300">$ {Number(cuenta.totalDerecho).toLocaleString()}</td>
							<td className="p-2 text-right bg-green-200">{cuenta.total > 0 && `$ ${Number(cuenta.total).toLocaleString()}`}</td>
							<td className="p-2 text-right bg-red-300">{cuenta.total < 0 && `$ ${Math.abs(Number(cuenta.total)).toLocaleString()}`}</td>
						</tr>
					))}
				</tbody>
				<tfoot className="bg-gray-100 font-semibold">
					<tr className="border-t border-gray-300">
						<td className="p-2">Suma total</td>
						<td className="p-2 text-right">$ {Number(mayor.cuentas.reduce((sum, cuenta) => sum + Number(cuenta.totalIzquierdo), 0)).toLocaleString()}</td>
						<td className="p-2 text-right">$ {Number(mayor.cuentas.reduce((sum, cuenta) => sum + Number(cuenta.totalDerecho), 0)).toLocaleString()}</td>
						<td className="p-2 text-right">$ {Number(mayor.cuentas.filter(cuenta => cuenta.total > 0).reduce((sum, cuenta) => sum + Number(cuenta.total), 0)).toLocaleString()}</td>
						<td className="p-2 text-right">$ {Math.abs(Number(mayor.cuentas.filter(cuenta => cuenta.total < 0).reduce((sum, cuenta) => sum + Number(cuenta.total), 0))).toLocaleString()}</td>
					</tr>
				</tfoot>
			</table>
		</div>
	);
};

export default Balanza;