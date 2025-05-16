import { useState, useEffect } from "react";
import { DatasGeneralesType } from "../types/DataGeneralType";
import AsientoReferencia from "../components/AsientoReferencia";
import { getAllAsientos } from "../api/AsientosTodos";
import { FormatearFecha } from "../utils/converterFecha";

export default function Historial() {
	  const [data, setData] = useState<DatasGeneralesType>();
	
	  useEffect(() => {
		const fetchData = async () => {
		  try {
			const res = await getAllAsientos();
			
			setData(res);
		  } catch (error) {
			console.error("Error al cargar el mayor:", error);
		  }
		};
		fetchData();
	  }, []);


	return (
		<div className="flex flex-col items-center p-4 gap-2 h-full w-full">
			{data?.map((asiento, _) =>(
				<AsientoReferencia concepto={asiento.dataHeader.tipoAsiento} numero={asiento.dataHeader.numero} descripcion={asiento.dataHeader.descripcion} fecha={FormatearFecha(asiento.dataHeader.fecha)}/>
			))}
		</div>
	)
}