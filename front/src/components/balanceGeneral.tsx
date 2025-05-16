import { BalanceType } from "../types/BalanceType";

const BalanceGeneralComponent= ({balance, fecha}:{balance: BalanceType, fecha:string}) => {
	
	// Obtener la longitud máxima entre los tres arreglos
	const maxLength = Math.max(
		balance.detalle.activos.length,
		balance.detalle.pasivos.length,
		balance.detalle.capital.length,
	);

	return (
		<div className="p-6 bg-gray-100 h-full w-full flex flex-col items-center">
			<h1 className="text-md font-bold text-gray-700 mb-4">
				Balance general de <strong>Tu cama 3B</strong> al {fecha}.
			</h1>
			<table className="w-full border-collapse border border-gray-300">
				<thead>
					<tr className="bg-gray-200">
						<th className="border border-gray-300 p-2 text-left" colSpan={2}>
							Activo
						</th>
						<th className="border border-gray-300 p-2 text-left" colSpan={2}>
							Pasivo
						</th>
						<th className="border border-gray-300 p-2 text-left" colSpan={2}>
							Capital
						</th>
					</tr>
				</thead>
				<tbody>
					{Array.from({ length: maxLength }, (_, index) => (
						<tr key={index}>
							{/* Activos */}
							<td className="border border-gray-300 p-2">
								{balance.detalle.activos[index]?.concepto || ""}
							</td>
							<td className="border border-gray-300 p-2">
								{balance.detalle.activos[index]?.valor.toLocaleString() || ""}
							</td>

							{/* Pasivos */}
							<td className="border border-gray-300 p-2">
								{balance.detalle.pasivos[index]?.concepto || ""}
							</td>
							<td className="border border-gray-300 p-2">
								{balance.detalle.pasivos[index]?.valor.toLocaleString() || ""}
							</td>

							{/* Capital */}
							<td className="border border-gray-300 p-2">
								{balance.detalle.capital[index]?.concepto || ""}
							</td>
							<td className="border border-gray-300 p-2">
								{balance.detalle.capital[index]?.valor.toLocaleString() || ""}
							</td>
						</tr>
					))}
				</tbody>
				<tfoot>
					<tr className="font-semibold">
						{/* Total Activos */}
						<td className="border border-gray-300 p-2">Total Activos</td>
						<td className="border border-gray-300 p-2 text-right">
							${balance.totalActivos.toLocaleString()}
						</td>

						{/* Total Pasivos */}
						<td className="border border-gray-300 p-2">Total Pasivos</td>
						<td className="border border-gray-300 p-2 text-right">
							${balance.totalPasivos.toLocaleString()}
						</td>

						{/* Total Capital */}
						<td className="border border-gray-300 p-2">Total Capital</td>
						<td className="border border-gray-300 p-2 text-right">
							${balance.totalCapital.toLocaleString()}
						</td>
					</tr>
					<tr className="font-semibold">
						<td className="border border-gray-300 p-2" colSpan={2}></td>

						{/* Total Pasivos */}
						<td className="border border-gray-300 p-2">Total Pasivos + Capital</td>
						<td className="border border-gray-300 p-2 text-right">
							${(balance.totalPasivos + balance.totalCapital) .toLocaleString()}
						</td>
						<td className="border border-gray-300 p-2" colSpan={2}></td>
					</tr>
				</tfoot>
			</table>
		</div>
	);
};

export default BalanceGeneralComponent;