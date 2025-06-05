import React, { useContext, useEffect } from "react";
import { AuthenticationContext } from "../../services/auth.context";
import { errorToast } from "../../toast/NotificationToast.jsx";
import { CardContainer, inputStyle, colorStrong } from "../../styles/Cards.jsx";

function UpcomingGames() {
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
        setGames(data);
        setLoading(false);
      })
      .catch((err) => {
        errorToast("Error fetching upcoming games");
        setError(err);
        console.error("Error:", err);
      });
  }, []);

  if (loading) return <p>Cargando datos del usuario...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  console.log(games);

  return (
    <div className={CardContainer}>
      {games.length > 0 && (
        <>
          <h2 className="text-xl font-bold text-white mb-6">
            Próximos Partidos
          </h2>
          <ul className="flex flex-col w-full gap-8">
            {games.map((game) => (
              <li
                key={game.id}
                className="border-2 border-gray-500 p-4 rounded-lg text-white"
              >
                <p className={inputStyle}>
                  <strong className={colorStrong}>Fecha:</strong>{" "}
                  {game.game.reservation.date}
                </p>
                <p className={inputStyle}>
                  <strong className={colorStrong}>Hora:</strong>{" "}
                  {game.game.reservation.schedule.schedule}hs
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
        </>
      )}
    </div>
  );
}

export default UpcomingGames;
