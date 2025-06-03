import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PartidosAgendados = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  const propertyId = localStorage.getItem('propertyId');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const getGames = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/properties/${propertyId}/games`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error('Error al obtener los partidos guardados');
        }

        const data = await res.json();
        setGames(data);
        toast.success('Partidos cargados con éxito');
      } catch (err) {
        toast.error(err.message || 'Ocurrió un error');
      } finally {
        setLoading(false);
      }
    };

    if (propertyId && token) {
      getGames();
    }
  }, [propertyId, token]);

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

export default PartidosAgendados;
