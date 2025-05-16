import { Outlet } from "react-router-dom";
const LayoutHistorial = () => {
  return (
    <div className="h-full min-w-screen flex flex-col bg-black">
      <div className="w-full text-white bg-[#9a76c6] p-4">
        <h1 className="text-xl font-medium mr-6 ml-4 mb-1">Historial de transacciones</h1>
      </div>
      <section className="flex-1 bg-white flex overflow-auto">
        <Outlet />
      </section>
    </div>
  );
};

export default LayoutHistorial;