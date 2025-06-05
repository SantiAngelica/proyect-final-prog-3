import React, { useContext, useEffect, useState } from "react";
import { AuthenticationContext } from "../../services/auth.context.jsx";
import { errorToast } from "../../toast/NotificationToast.jsx";
import UpcomingGames from "../profile/UpcomingGames";
import RedButton from "../../styles/RedButton.jsx";
import Button1 from "../../styles/Button1.jsx";
import { ContainerStyle } from "../../styles/Container.jsx";
import {
  CardContainer,
  TittleCard,
  inputStyle,
  colorStrong,
} from "../../styles/Cards.jsx";

const Profile = () => {
  const { token } = useContext(AuthenticationContext);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/users/profile", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          errorToast("Error al obtener el perfil del usuario");
          setError("Error al obtener el perfil del usuario");
        }
        return res.json();
      })
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        errorToast("Error al obtener el perfil del usuario");
        setError("Error al obtener el perfil del usuario");
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div className={ContainerStyle}>
        <p>Cargando datos del usuario...</p>
      </div>
    );
  if (error)
    return (
      <div className={ContainerStyle}>
        <p className="text-red-500">{error}</p>
      </div>
    );
  return (
    <div className={ContainerStyle}>
      <div className="w-full mb-6">
        <UpcomingGames />
      </div>
      <div className={CardContainer}>
        <h2 className={TittleCard}>Perfil de Usuario</h2>

        <div className="flex flex-col items-start w-full">
          <p className={inputStyle}>
            {" "}
            <strong className={colorStrong}>Nombre:</strong> {user.name}
          </p>
          <p className={inputStyle}>
            <strong className={colorStrong}>Email:</strong> {user.email}
          </p>
          <p className={inputStyle}>
            <strong className={colorStrong}>Edad:</strong> {user.age}
          </p>

          <p className={inputStyle}>
            <strong className={colorStrong}>Zona:</strong> {user.zone}
          </p>
          <p className={inputStyle}>
            <strong className={colorStrong}>Posiciones:</strong>{" "}
            {user.positions.map((pos) => pos.position).join(", ")}
          </p>
          <p className={inputStyle}>
            <strong className={colorStrong}>Canchas de:</strong>{" "}
            {user.fieldsType.map((field) => field.field).join(", ")}
          </p>
        </div>
        <Button1 className="mt-4">
          <a href={`/user/update/${user.id}`}>Actualizar perfil</a>
        </Button1>
      </div>
    </div>
  );
};

export default Profile;
