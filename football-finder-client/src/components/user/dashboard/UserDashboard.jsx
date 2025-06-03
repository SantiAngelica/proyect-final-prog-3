import React from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "../../navbar/NavBar";

import MisPartidos from "../misPartidos/MisPartidos.jsx";
import PartidoForm from "../partidoForm/partidoForm.jsx";
import PropertyList from "../PropertyList/PropertyList.jsx";

const UserDashboard = () => {
  return (
    <>
      <NavBar
        links={[
          { item: "Crear juego", url: "/user/create" },
          { item: "Registro de juegos", url: "/user/record" },
          { item: "Lista de propiedades", url: "/user/properties" },
        ]}
      />

      <Routes>
        <Route index  element={<PropertyList />} />
        <Route path="create" element={<PartidoForm />} />
        <Route path="record" element={<MisPartidos />} />
        <Route path="properties" element={<PropertyList />} />
      </Routes>
    </>
  );
};

export default UserDashboard;
