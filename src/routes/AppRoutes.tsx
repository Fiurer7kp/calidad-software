import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";

import HomePage from "../views/HomePage";
import Descomposicion from "../views/Descomposicion";
import CienciasNaturalesPage from "../views/CienciasNaturalesPage";
import CicloDelAgua from "../views/CicloDelAgua";
import CienciasSociales from "../views/CienciasSociales";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="matematicas/descomposicion" element={<Descomposicion />} />
        <Route path="ciencias-naturales" element={<CienciasNaturalesPage />} />
        <Route path="ciclo-del-agua" element={<CicloDelAgua />} />
        <Route path="ciencias-sociales" element={<CienciasSociales />} />
      </Route>
    </Routes>
  );
}
