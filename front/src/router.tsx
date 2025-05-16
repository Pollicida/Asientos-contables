import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import { Asientos } from "./pages/Asientos";
import LayoutHistorial from "./layouts/LayoutHistorial";
import Historial from "./pages/Historial";
import Transaccion from "./pages/Transaccion";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="Asientos" element={<Asientos />}/>
            <Route path="Historial" element={<LayoutHistorial />}>
              <Route index element={<Historial />}/>
              <Route path=":asiento" element={<Transaccion />}/>
            </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;