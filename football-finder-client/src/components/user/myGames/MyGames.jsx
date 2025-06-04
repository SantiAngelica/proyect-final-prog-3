import React, { useEffect } from "react";
import { useContext, useState } from "react";
import { AuthenticationContext } from "../../services/auth.context";
import { errorToast } from "../../toast/NotificationToast";
import { ContainerStyle } from "../../styles/Container";
import { TittleCard, inputStyle, colorStrong } from "../../styles/Cards";
import Button1 from "../../styles/Button1";
import AppItem from "./AppItem";

function MyGames() {
  const [games, setGames] = useState([]);
  const [applications, setApplications] = useState([]);
  const [usersInGame, setUsersInGame] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token } = useContext(AuthenticationContext);

  useEffect(() => {
    fetch("http://localhost:8080/api/users/my-games", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          errorToast("Error al cargar los juegos");
          setError(true);
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data) {
          setGames(data)
          const allApplications = data.flatMap(game => game.gameApplications);
          const pendingApplications = allApplications.filter(app => app.state.trim().toLowerCase() === 'pendiente');
          setApplications(pendingApplications);
          const allUsersInGame = data.flatMap(game => game.players);
          setUsersInGame(allUsersInGame);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(true);
        errorToast("Error al cargar los juegos");
      });
  }, []);


  const onAcceptApplication = (applicationId, user) => {
    setApplications((prevApplications) =>
      prevApplications.filter((app) => app.id !== applicationId)
    );
    setUsersInGame((prevUsers) => [...prevUsers, { player: user }]);
  }

  if (loading)
    return (
      <div className={ContainerStyle}>
        <p>Cargando mis juegos...</p>
      </div>
    );
  if (error)
    return (
      <div className={ContainerStyle}>
        <p className="text-red-500">{error}</p>;
      </div>
    );


  return (
    <div className={ContainerStyle}>
      {loading && <p>Cargando juegos...</p>}
      {error && <p>Error al cargar los juegos.</p>}
      {games.length === 0 && !loading && <p>No tienes juegos creados.</p>}
      <div className="flex flex-col items-start bg-white/10 backdrop-blur-md shadow-lg border border-white/20 rounded-xl p-6 w-1/2 h-1/2">
        <h2 className={TittleCard}>Mis partidos</h2>
        <ul className="flex flex-col w-full gap-12">
          {games.map((game) => (
            <li
              className="border-2 border-gray-500 p-4 rounded-lg"
              key={game.id}
            >
              <h2 className={inputStyle}>
                <strong className={colorStrong}>Predio: </strong>
                {game.reservation.fieldType.property.name}
              </h2>
              <p className={inputStyle}>
                <strong className={colorStrong}>Descripción: </strong>
                {game.description}
              </p>
              <p className={inputStyle}>
                <strong className={colorStrong}>Fecha: </strong>
                {game.reservation.date}
              </p>
              <p className={inputStyle}>
                <strong className={colorStrong}>Hora: </strong>
                {game.reservation.schedule.schedule}
                <strong className={colorStrong}> hs</strong>
              </p>
              <p className={inputStyle}>
                <strong className={colorStrong}>Jugadores restantes: </strong>
                {game.missing_players}
              </p>
              <Button1>
                <a href={`/user/users-list/${game.id}`}>Invitar jugadores</a>
              </Button1>
              {usersInGame.length > 0 && <h2 className={TittleCard}>Jugadores confirmados:</h2>}
              
              <ul className="flex flex-col gap-2">
                {usersInGame.map((user) => (
                  <li key={user.id} className={inputStyle}>
                    {user.player.name} ({user.player.email})
                  </li>
                ))}
              </ul>
              <h2 className={TittleCard}>Postulaciones pendientes:</h2>
              <ul className="flex flex-col gap-2">
                {applications.map((application) => (
                  <AppItem key={application.id} application={application} onAcceptApplication={onAcceptApplication} />
                ))}
              </ul>
            </li>
          ))}
        </ul>

      </div>
    </div>
  );
}

export default MyGames;
