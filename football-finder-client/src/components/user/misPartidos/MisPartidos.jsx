import React, { useEffect, useState } from "react";

const MisPartidos = ({ userId }) => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("football-finder-token");

    if (!token) {
      setError("No token found. Please log in.");
      setLoading(false);
      return;
    }

    fetch(`http://localhost:5000/api/users/${userId}/games`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch games");
        }
        return res.json();
      })
      .then((data) => {
        setGames(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Error loading game history.");
        setLoading(false);
      });
  }, [userId]);

  if (loading) return <p>Cargando historial de partidos...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="w-full h-full">
      <h2 className="text-xl font-bold mb-4">Historial de partidos</h2>
      {games.length === 0 ? (
        <p>No hay partidos registrados</p>
      ) : (
        <ul className="space-y-2">
          {games.map((game) => (
            <li key={game.id} className="border p-3 rounded shadow">
              <div className="font-semibold">{game.property_name}</div>
              <div className="text-sm text-gray-600">
                {new Date(game.date).toLocaleDateString()} — {game.schedule}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MisPartidos;
