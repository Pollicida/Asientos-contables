import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Layout = () => {
  return (
    <div className="h-screen w-screen flex flex-col bg-black">
      <Navbar />
      <main className="flex-1 bg-[#E4EFE7] overflow-auto">
        <Outlet />
      </main>
      <footer className="py-1 px-5 bg-[#8157b3] text-white">
        © 2025 Asientos contables por Cristian Emanuel
      </footer>
    </div>
  );
};

export default Layout;