import React, { useEffect, useState, useContext } from "react";
import { AuthenticationContext } from "../../services/auth.context.jsx";
import GameItem from "./GameItem.jsx";
import { jwtDecode } from "jwt-decode";
import { ContainerStyle } from "../../styles/Container.jsx";

function GamesAvlb() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useContext(AuthenticationContext);

  useEffect(() => {
    if (!token) {
      setError("No token found. Please log in.");
      setLoading(false);
      return;
    }

    const decoded = jwtDecode(token);

    fetch("http://localhost:8080/api/games/availables", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          if (res.status == 404) {
            return res.json().then((data) => {
              throw new Error("No hay juegos disponibles");
            });
          }
          throw new Error("Failed to fetch games");
        }
        return res.json();
      })
      .then((data) => {
        const filteredGames = data.filter(
          (game) => game.id_user_creator !== decoded.id
        );
        setGames(filteredGames);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message || "Error loading games.");
        setLoading(false);
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
  if (games.length === 0)
    return (
      <div className={ContainerStyle}>
        <p>No hay juegos disponibles.</p>
      </div>
    );

  return (
    <div className={ContainerStyle}>
      <div className="flex flex-col gap-8 w-full items-center">
        {games.map((game) => (
          <GameItem key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
}

export default GamesAvlb;
