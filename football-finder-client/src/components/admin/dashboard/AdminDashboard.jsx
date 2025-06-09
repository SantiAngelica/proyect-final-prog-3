import NavBar from "../../navbar/NavBar";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import MyProperty from "../myProperty/MyProperty";
import CreateProperty from '../createProperty/CreateProperty.jsx'
import GamesList from '../GamesList/GamesList.jsx'
import PendingList from "../pendignList/PendingList.jsx";
import UpdateForm from '../updateForm/UpdateForm.jsx'

const AdminDashboard = () => {
  const [hasProperty, setHasProperty] = useState(true);

  if (hasProperty) {
    return (
      <>
        <NavBar links={[
          { item: 'Mi Propiedad', url: '/admin' },
          { item: 'Juegos Agendados', url: '/admin/schedule-games' },
          { item: 'Reservas en espera', url: '/admin/pending-reservations' },
        ]} />

        <Routes>
          <Route index element={<MyProperty setHasProperty={setHasProperty} />} />
          <Route path="schedule-games" element={<GamesList />} />
          <Route path="pending-reservations" element={<PendingList />} />
          <Route path="update/:pid" element={<UpdateForm />} />
        </Routes>
      </>
    )
  }
  else {
    return (
      <>
        <NavBar/>
        <Routes>
          <Route index element={<CreateProperty  setHasProperty={setHasProperty}/>} />
        </Routes>
      </>
    )
  }
};

export default AdminDashboard;
