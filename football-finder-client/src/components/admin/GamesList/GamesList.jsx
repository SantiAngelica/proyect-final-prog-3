import React, { useEffect, useState, useContext } from "react";
import { AuthenticationContext } from "../../services/auth.context";
import { ContainerStyle } from "../../styles/Container";
import { CardContainer, TittleCard } from "../../styles/Cards";
import { inputStyle, colorStrong } from "../../styles/Cards";

const GamesList = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { token } = useContext(AuthenticationContext);

  useEffect(() => {
    fetch("http://localhost:8080/api/properties/games", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          if (res.status === 400) {
            return res.json().then((data) => {
              throw new Error(data.message || "Error al obtener los partidos");
            });
          }
          throw new Error("Error al obtener los partidos");
        }
        return res.json();
      })
      .then((data) => {
        if (data) {
          const filteredGames = data.filter(
            (game) => game.reservation.state === "aceptada"
          );
          setGames(filteredGames);
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        setError(true);
      });
  }, [token]);

  if (loading)
    return (
      <div className={ContainerStyle}>
        <p>Cargando juegos...</p>
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
      <div className={CardContainer}>
        <h2 className={TittleCard}>Partidos agendados</h2>
        {loading ? (
          <p>Cargando partidos...</p>
        ) : games.length === 0 ? (
          <p>No hay partidos agendados para este predio</p>
        ) : (
          <ul className="flex flex-col w-full gap-12">
            {games.map((game) => (
              <li
                className="border-2 border-gray-500 p-4 rounded-lg"
                key={game.id}
              >
                <h2 className={inputStyle}>
                  <strong className={colorStrong}>A nombre de: </strong>
                  {game.userCreator.name}
                </h2>
                <h2 className={inputStyle}>
                  <strong className={colorStrong}>Dia y hora: </strong>{" "}
                  {game.reservation.date} - {game.reservation.schedule.schedule}
                  :00<strong className={colorStrong}> hs</strong>
                </h2>
                <h2 className={inputStyle}>
                  <strong className={colorStrong}>Cancha: </strong>
                  {game.reservation.fieldType.field_type}
                </h2>
                <h2 className={inputStyle}>
                  {" "}
                  <strong className={colorStrong}>Estado: </strong>
                  {game.reservation.state}
                </h2>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default GamesList;
