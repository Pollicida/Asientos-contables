import AsientoReferencia from "../components/AsientoReferencia"
import { useEffect, useState } from "react"
import { getRecientes } from "../api/AsientosRecientes";
import { FormatearFecha } from "../utils/converterFecha";

import { BtnEstadosType } from "../types/newTypes";

export default function Home() {
  const [data, setData] = useState<BtnEstadosType>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getRecientes();
        setData(res.data.slice(0, 6));
      } catch (error) {
        console.error("Error al cargar el mayor:", error);
      }
    };
    fetchData();
  }, []);


  return (
    <div className="h-full text-black flex flex-col items-center pt-6">
      <div className="text-gray-600 w-[78%] mb-1">Recientes</div>
      <hr className="w-[80%] border-gray-400 border-[1px]" />
      <div className="w-full flex flex-col items-center pt-2 gap-2">
        {data? data.map((asiento, _) => (
          <AsientoReferencia descripcion={asiento.descripcion} fecha={FormatearFecha(asiento.fecha)} id={asiento.estadoId} />
        ))
        : <div className="text-gray-500">No hay asientos recientes</div>
        }
      </div>
    </div>
  )
}