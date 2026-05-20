import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";

import HomePage from "../views/HomePage";
import Descomposicion from "../views/Descomposicion";
import CienciasNaturalesPage from "../views/CienciasNaturalesPage";
import CicloDelAgua from "../views/CicloDelAgua";
import CienciasSociales from "../views/CienciasSociales";
import LenguajePage from "../views/LenguajePage";
import HistoriaPage from "../views/HistoriaPage";
import LogicaPage from "../views/LogicaPage";
import DocentePage from "../views/DocentePage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="matematicas/descomposicion" element={<Descomposicion />} />
        <Route path="ciencias-naturales" element={<CienciasNaturalesPage />} />
        <Route path="ciclo-del-agua" element={<CicloDelAgua />} />
        <Route path="ciencias-sociales" element={<CienciasSociales />} />
        <Route path="lenguaje" element={<LenguajePage />} />
        <Route path="historia" element={<HistoriaPage />} />
        <Route path="logica" element={<LogicaPage />} />
        <Route path="docente" element={<DocentePage />} />
      </Route>
    </Routes>
  );
}
