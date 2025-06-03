import React from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "../../navbar/NavBar";

import MisPartidos from "../misPartidos/MisPartidos.jsx";
import PartidoForm from "../partidoForm/partidoForm.jsx";
import PropertyList from "../PropertyList/PropertyList.jsx";
import Profile from "../profile/Profile.jsx";
import UpdateForm from "../profile/UpdateForm.jsx";
import GamesAvlb from "../gamesAvlb/GamesAvlb.jsx";
import Participations from "../participations/Participations.jsx";
import MyGames from "../myGames/MyGames.jsx"; 
import UsersList from "../myGames/UsersList.jsx";

const UserDashboard = () => {
  return (
    <>
      <NavBar
        links={[
          { item: "Perfil", url: "/user"},
          { item: "Crear juego", url: "/user/create-game" },
          { item: "Registro de juegos", url: "/user/record" },
          { item: "Lista de propiedades", url: "/user/properties" },
          { item: "Lista de partidos", url: '/user/availables-games'},
          { item: "Invitaciones y Aplicaciones", url: '/user/participations'},
          { item: "Mis juegos", url: '/user/my-games'},
        ]}
      />

      <Routes>
        <Route index element={<Profile/>} />
        <Route path="update/:uid" element={<UpdateForm/>} />
        <Route path="create-game" element={<PartidoForm />} />
        <Route path="record" element={<MisPartidos />} />
        <Route path="properties" element={<PropertyList />} />
        <Route path="availables-games" element={<GamesAvlb />} />
        <Route path="participations" element={<Participations />} />
        <Route path="my-games" element={<MyGames />} />
        <Route path="users-list/:gid" element={<UsersList />} />
      </Routes>
    </>
  );
};

export default UserDashboard;
