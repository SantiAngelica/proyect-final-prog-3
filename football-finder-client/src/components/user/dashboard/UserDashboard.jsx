import React from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "../../navbar/NavBar"; 

import MisPartidos from "../misPartidos/MisPartidos.jsx";
import PartidoForm from "../partidoForm/partidoForm.jsx";
import CanchaList from "../canchaList/CanchaList.jsx";
import CanchaDetail from "../canchaDetail/CanchaDetail.jsx";

const UserDashboard = () => {
  return (
    <>
      <NavBar
        links={[
          { item: "Crear Partido", url: "/dashboard/crear" },
          { item: "Historial", url: "/dashboard/historial" },
          { item: "Lista de canchas", url: "/dashboard/canchas" },
          { item: "Detalles de cancha", url: "/dashboard/detalles" },
        ]}
      />

      <Routes>
        <Route path="crear" element={<PartidoForm />} />
        <Route path="historial" element={<MisPartidos />} />
        <Route path="canchas" element={<CanchaList />} />
        <Route path="detalles" element={<CanchaDetail />} />
      </Routes>
    </>
  );
};

export default UserDashboard;
