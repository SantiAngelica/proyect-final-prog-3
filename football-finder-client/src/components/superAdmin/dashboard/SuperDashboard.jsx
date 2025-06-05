import React from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "../../navbar/NavBar";

import ListaUsuarios from "../usuarios/ListaUsuarios.jsx";
import ListaGames from "../games/ListaGames.jsx";
import ListaPredios from "../predios/ListaPredios.jsx";

const SuperDashboard = () => {
  return (
    <>
      <NavBar
        links={[
          { item: "Usuarios ", url: "/superadmin" },
          { item: "Propiedades", url: "/superadmin/properties" },
          { item: "Juegos", url: "/superadmin/games" },
        ]}
      />

      <Routes>
        <Route index element={<ListaUsuarios />}></Route>
        <Route path="properties" element={<ListaPredios />} />
        <Route path="games" element={<ListaGames />} />
      </Routes>
    </>
  );
};

export default SuperDashboard;
