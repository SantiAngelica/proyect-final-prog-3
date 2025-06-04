import React, { useEffect, useState, useContext } from 'react';
import { AuthenticationContext } from '../../services/auth.context';

const GamesList = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { token } = useContext(AuthenticationContext)

  useEffect(() => {
    fetch('http://localhost:3000/api/property/games', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }).then((res) => {
      if (!res.ok) {
        if (res.status === 400) {
          return res.json().then((data) => {
            throw new Error(data.message || "Error al obtener los partidos");
          });
        }
        throw new Error('Error al obtener los partidos');
      }
      return res.json();
    }).then((data) => {
      if (data) {
        setGames(data);
        setLoading(false);
      }
    }).catch((err) => {
      setLoading(false);
      setError(true);
    });
  }, [token])

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
    <div>
      <ToastContainer />
      <h2>Partidos agendados</h2>
      {loading ? (
        <p>Cargando partidos...</p>
      ) : games.length === 0 ? (
        <p>No hay partidos agendados para este predio</p>
      ) : (
        <ul>
          {games.map((game) => (
            <li key={game.id}>
              <strong>{game.name || 'partido sin nombre'}</strong> <br />
              Fecha: {new Date(game.date).toLocaleString()} <br />
              Estado: {game.state || 'pendiente'}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GamesList;
