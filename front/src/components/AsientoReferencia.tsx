import { useNavigate } from "react-router-dom"
import { AsientoReferenciaType } from "../types/AsientoReferenciaType";

const AsientoReferencia = ({descripcion, fecha, id} : AsientoReferenciaType) => {
    const navigate = useNavigate();
    return (
        <div className="cursor-pointer w-[80%] min-h-[50px] px-7 flex items-center bg-[#c3d1c779] hover:bg-slate-100 active:bg-gray-300 border-gray-700 rounded-2xl gap-6 shadow-xs overflow-hidden text-ellipsis whitespace-nowrap" onClick={()=>navigate(`/Historial/${id}`)}>
            <h1 className="text-slate-500 text-center text-md">{descripcion}</h1>
            <h1 className="text-slate-500 text-center text-md">{fecha}</h1>
        </div>
    )
}

export default AsientoReferencia