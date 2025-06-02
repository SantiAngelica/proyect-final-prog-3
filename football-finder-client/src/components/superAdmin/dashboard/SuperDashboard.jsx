import React from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "../../navbar/NavBar";

import ListaUsuarios from "../usuarios/ListaUsuarios.jsx"
import ListaAdmins from "../admins/ListaAdmins.jsx"
import ListaGames from "../games/ListaGames.jsx"
import ListaPredios from "../predios/ListaPredios.jsx"

const SuperDashboard = () => {
  return (
    <>
      <NavBar links={[
        { item: 'Players', url: '/superadmin' },
        { item: 'Properties', url: '/superadmin/properties' },
        { item: 'Admins', url: '/superadmin/admins' },
        { item: 'Games', url: '/superadmin/games' }
      ]} />

      <Routes>
        <Route index element={<ListaUsuarios/>}></Route>
        <Route path="properties" element={<ListaPredios/>}/>
        <Route path="admins" element={<ListaAdmins/>}/>
        <Route path="Games" element={<ListaGames/>}/>
      </Routes>
    </>
  )
};

export default SuperDashboard;
