import AsientoReferencia from "../components/AsientoReferencia"
import { useEffect, useState } from "react"
import { getRecientes } from "../api/AsientosRecientes";
import { DatasGeneralesType } from "../types/DataGeneralType";
import { FormatearFecha } from "../utils/converterFecha";

export default function Home() {
  const [data, setData] = useState<DatasGeneralesType>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getRecientes();
        setData(res);
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
        {data?.map((asiento, _) => (
          <AsientoReferencia concepto={asiento.dataHeader.tipoAsiento} numero={asiento.dataHeader.numero} descripcion={asiento.dataHeader.descripcion} fecha={FormatearFecha(asiento.dataHeader.fecha)} />
        ))}
      </div>
    </div>
  )
}