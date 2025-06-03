import React, { useContext, useEffect, useState } from "react";
import { AuthenticationContext } from "../../services/auth.context.jsx";
import { errorToast } from "../../toast/NotificationToast.jsx";
import RedButton from "../../styles/RedButton.jsx";
import Button1 from "../../styles/Button1.jsx";
import { CardContainer, TittleCard, DatosCard } from "../../styles/Cards.jsx";

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

  const colorStrong = "font-normal pr-2";

  if (loading) return <p>Cargando datos del usuario...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className={CardContainer}>
        <h2 className={TittleCard}>Perfil de Usuario</h2>
        <div className="profile-info">
          <p className={DatosCard}>
            {" "}
            <strong className={colorStrong}>Nombre:</strong> {user.name}
          </p>
          <p className={DatosCard}>
            <strong className={colorStrong}>Email:</strong> {user.email}
          </p>
          <p className={DatosCard}>
            <strong className={colorStrong}>Edad:</strong> {user.age}
          </p>
          <p className={DatosCard}>
            <strong className={colorStrong}>Zona:</strong> {user.zone}
          </p>
          <p className={DatosCard}>
            <strong className={colorStrong}>Posiciones:</strong>{" "}
            {user.positions.map((pos) => pos.position).join(", ")}
          </p>
          <p className={DatosCard}>
            <strong className={colorStrong}>Canchas:</strong>{" "}
            {user.fieldsType.map((field) => field.field).join(", ")}
          </p>
          <p className={DatosCard}>
            <strong className={colorStrong}>Comentarios:</strong>{" "}
            {user.comments.map((field) => field.field).join(", ")}
          </p>
        </div>
        <Button1 className="mt-4">
          <a href={`/user/update/${user.id}`}>Actualizar perfil</a>
        </Button1>
        <div className="mt-4">
          <RedButton>Borrar perfil</RedButton>
        </div>
      </div>
      <div className="mt-4">
        <UpcomingGames />
      </div>
    </div>
  );
};

export default Profile;
