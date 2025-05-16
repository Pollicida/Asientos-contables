import { useState, useEffect } from "react";
import { BtnEstadosType } from "../types/newTypes";
import AsientoReferencia from "../components/AsientoReferencia";
import { getRecientes } from "../api/AsientosRecientes";
import { FormatearFecha } from "../utils/converterFecha";

export default function Historial() {
	const [data, setData] = useState<BtnEstadosType>();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await getRecientes();
				setData(res.data);
			} catch (error) {
				console.error("Error al cargar el mayor:", error);
			}
		};
		fetchData();
	}, [])


	return (
		<div className="flex flex-col items-center p-4 gap-2 h-full w-full">
			{data ? data.map((asiento, _) => (
				<AsientoReferencia descripcion={asiento.descripcion} fecha={FormatearFecha(asiento.fecha)} id={asiento.estadoId} />
			))
				: <div className="text-gray-500">No hay asientos</div>
			}
		</div>
	)
}