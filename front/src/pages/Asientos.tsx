import { useState, useEffect } from "react";
import { getUltimoAsiento } from "../api/UltimoAsiento";
import AsientoTable from "../components/AsientoTable";
import { DataGeneralType } from "../types/DataGeneralType";
import generalDataExample from "../utils/DatosEjemplo/generalDataExample";

export const Asientos = () => {
  //Página Asientos
  //Pedir a la base de datos el último asiento (Interesa: Numero de asiento, mayor y balance)
  const [data, setData] = useState<DataGeneralType>(generalDataExample);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getUltimoAsiento();
        console.log("Asientos Page Data anterior: ", res);
        if (res) {
          setData(res);
        } else {
          console.log("Sin asientos previos");
        }
      } catch (error) {
        console.error("Error al cargar el mayor:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <section className="w-full h-full text-black flex relative">
      {data &&
        <AsientoTable balanceAnterior={data.balance} numeroAsientoAnterior={data.dataHeader.numero} mayorAnterior={data.mayor}/>
      }
    </section>
  );
};