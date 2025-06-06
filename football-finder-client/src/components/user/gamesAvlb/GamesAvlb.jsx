import React, { useEffect, useState, useContext } from "react";
import { AuthenticationContext } from "../../services/auth.context.jsx";
import GameItem from "./GameItem.jsx";
import { jwtDecode } from "jwt-decode";
import { ContainerStyle } from "../../styles/Container.jsx";
import SearchInput from '../../searchInput/SearchInput.jsx'

function GamesAvlb() {
  const [games, setGames] = useState([]);
  const [query, setQuery] = useState("");
  const [filteredGames, setFilteredGames] = useState([]);
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
        setFilteredGames(filteredGames);
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


  const handleChangeQuery = (query) => {
    setQuery(query);
    if (!query) {
      setFilteredGames(games);
      return;
    }
    const filtered = games.filter((game) =>
      game.userCreator.name.toLowerCase().includes(query.toLowerCase()) ||
      game.reservation.fieldType.property.name.toLowerCase().includes(query.toLowerCase()) ||
      game.reservation.fieldType.field_type.toLowerCase().includes(query.toLowerCase()) ||
      game.reservation.date.toLowerCase().includes(query.toLowerCase()) ||
      game.reservation.fieldType.property.zone.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredGames(filtered);

  }

  return (
    <div className={ContainerStyle} >
      <SearchInput query={query} setQuery={handleChangeQuery} />
      <div className="flex flex-col gap-8 w-full items-center mt-15">
        {filteredGames.map((game) => (
          <GameItem key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
}

export default GamesAvlb;
