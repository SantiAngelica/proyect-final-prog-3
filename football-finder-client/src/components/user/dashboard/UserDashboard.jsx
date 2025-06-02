import React from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "../../navbar/NavBar"; 

import MisPartidos from "../misPartidos/MisPartidos.jsx";
import PartidoForm from "../partidoForm/partidoForm.jsx";
import PropertyList from "../PropertyList/PropertyList.jsx";
// import CanchaDetail from "../canchaDetail/CanchaDetail.jsx";

const UserDashboard = () => {
  return (
    <>
      <NavBar
        links={[
          { item: "Create Game", url: "/user/create" },
          { item: "Game Record", url: "/user/record" },
          { item: "Property list", url: "/user/properties" },
          { item: "Fields Details", url: "/user/details" },
        ]}
      />

      <Routes>
        <Route path="create" element={<PartidoForm />} />
        <Route path="record" element={<MisPartidos />} />
        <Route path="properties" element={<PropertyList />} />
        {/* <Route path="detalles" element={<CanchaDetail />} /> */}
      </Routes>
    </>
  );
};

export default UserDashboard;
