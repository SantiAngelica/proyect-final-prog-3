import React from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "../../navbar/NavBar";
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
          { item: "Crear juego", url: "/user" },
          { item: "Lista de partidos", url: "/user/availables-games" },
          { item: "Invitaciones y Aplicaciones", url: "/user/participations" },
          { item: "Mis partidos", url: "/user/my-games" },
          { item: "Lista de propiedades", url: "/user/properties" },
          { item: "Mi perfil", url: "/user/profile" },
        ]}
      />

      <Routes>
        <Route index element={<PartidoForm />} />
        <Route path="profile" element={<Profile />} />
        <Route path="update/:uid" element={<UpdateForm />} />
        <Route path="create-game" element={<PartidoForm />} />
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
