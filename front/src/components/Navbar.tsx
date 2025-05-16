import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;
  return (
    <nav className="min-h-14 px-4 bg-[#8157b3] text-white flex gap-1 sticky">
      <button onClick={()=>{navigate("/")}} className={`${isActive("/") && "bg-[#9a76c6] rounded-t-2xl"} h-full px-4 hover:bg-[#9e79cc] hover:rounded-t-2xl active:bg-[#9a76c6]`}>Inicio</button>
      <button onClick={()=>{navigate("/Asientos")}}className={`${isActive("/Asientos") && "bg-[#9a76c6] rounded-t-2xl"} h-full px-4 hover:bg-[#9e79cc] hover:rounded-t-2xl active:bg-[#9a76c6]`}>Asientos contables</button>
      <button onClick={()=>{navigate("/Historial")}} className={`${isActive("/Historial") && "bg-[#9a76c6] rounded-t-2xl"} h-full px-4 hover:bg-[#9e79cc] hover:rounded-t-2xl active:bg-[#9a76c6]`}>Reportes</button>
    </nav>
  );
}

export default Navbar;