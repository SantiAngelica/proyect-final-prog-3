import React, { useEffect, useState, useContext } from 'react';
import { AuthenticationContext } from '../../services/auth.context';
import { ContainerStyle } from '../../styles/Container';

const GamesList = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { token } = useContext(AuthenticationContext)

  useEffect(() => {
    fetch('http://localhost:8080/api/properties/games', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
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
        const filteredGames = data.filter(game => game.reservation.state === 'aceptada')
        setGames(filteredGames);
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
    <div className='mt-5'>
      <h2>Partidos agendados</h2>
      {loading ? (
        <p>Cargando partidos...</p>
      ) : games.length === 0 ? (
        <p>No hay partidos agendados para este predio</p>
      ) : (
        <ul>
          {games.map((game) => (
            <li key={game.id}>
              <strong>Dia y hora: {game.reservation.date} - {game.reservation.schedule.schedule}:00hs</strong>
             <br />
              Cancha: {game.reservation.fieldType.field_type} 
              <br />
              Estado: {game.reservation.state}
              <br />
              A nombre de: {game.userCreator.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GamesList;
