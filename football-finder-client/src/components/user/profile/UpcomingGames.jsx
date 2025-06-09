import React, { useContext, useEffect } from "react";
import { AuthenticationContext } from "../../services/auth.context";
import { errorToast } from "../../toast/NotificationToast.jsx";
import {
  CardContainer,
  inputStyle,
  colorStrong,
  TittleCard,
} from "../../styles/Cards.jsx";
import { ContainerStyle } from "../../styles/Container.jsx";

function UpcomingGames({setHasGames}) {
  const { token } = useContext(AuthenticationContext);
  const [loading, setLoading] = React.useState(true);
  const [games, setGames] = React.useState([]);
  const [error, setError] = React.useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/users/play-in", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error fetching upcoming games");
        }
        return res.json();
      })
      .then((data) => {
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);
        console.log(data)
        const gamesFiltrados = data.filter((game) => {
          const fechaJuego = new Date(game.game.reservation.date + "T00:00:00");
          return fechaJuego >= hoy;
        });
        if (gamesFiltrados.length === 0) {
          setHasGames(false);
        }
        setGames(gamesFiltrados);
        setLoading(false);
      })
      .catch((err) => {
        errorToast("Error cargando los partidos");
        setError(err);
        console.error("Error:", err);
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
    <div className={CardContainer}>
      {games.length > 0 && (
        <ul className="flex flex-col w-full">
          <h2 className={TittleCard}>Próximos Partidos</h2>
          {games.map((game) => (
            <li key={game.game.id} className="mb-6 flex flex-col items-start justify-start w-full border-2 border-gray-500 p-4 rounded-lg">
              <p className={inputStyle}>
                <strong className={colorStrong}>Fecha:</strong>{" "}
                {game.game.reservation.date}
              </p>
              <p className={inputStyle}>
                <strong className={colorStrong}>Hora:</strong>{" "}
                {game.game.reservation.schedule.schedule}
                :00hs
              </p>
              <p className={inputStyle}>
                <strong className={colorStrong}>Cancha:</strong>{" "}
                {game.game.reservation.fieldType.property.zone} -{" "}
                {game.game.reservation.fieldType.property.adress}
              </p>
              <p className={inputStyle}>
                <strong className={colorStrong}>Creador:</strong>{" "}
                {game.game.userCreator.name}
              </p>
              <p className={inputStyle}>
                <strong className={colorStrong}>Tipo de cancha:</strong>{" "}
                {game.game.reservation.fieldType.field_type}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default UpcomingGames;
