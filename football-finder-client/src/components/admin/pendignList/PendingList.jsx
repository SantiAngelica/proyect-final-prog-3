import React, { useEffect, useState, useContext, use } from 'react';
import { AuthenticationContext } from '../../services/auth.context.jsx';
import { errorToast, successToast } from '../../toast/NotificationToast.jsx';
import  Button1 from '../../styles/Button1.jsx'

const PendingList = () => {
  const [pendientes, setPendientes] = useState([]);

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
        const filteredGames = data.filter(game => game.reservation.state === 'pendiente')
        setPendientes(filteredGames);
        setLoading(false);
      }
    }).catch((err) => {
      setLoading(false);
      setError(true);
    });
  }, [token]);

  const aceptarReserva = async (rid) => {
    fetch(`http://localhost:8080/api/properties/${rid}/acepted`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      if (!res.ok) {
        if (res.status === 400) {
          return res.json().then(data => {
            throw new Error(data.message || 'Error al aceptar la reserva');
          });
        }
        throw new Error('Error al aceptar la reserva');
      }
      return res.json();
    }).then(data => {
      if (data) {
        const aceptada = pendientes.find(r => r.id === rid);
        if (aceptada) {
          setPendientes(prev => prev.filter(r => r.id !== rid));
          successToast('Reserva aceptada correctamente');
        }
      }
    }).catch(err => {
      errorToast(err)
    })
  };

  if (loading) return <p>Cargando reservas...</p>;


  return (
    <div>
      <h2>Reservas Pendientes</h2>
      {pendientes.length === 0 ? (
        <p>No hay reservas pendientes</p>
      ) : (
        <ul>
          {pendientes.map((game) => (
            <li key={game.id} style={{ marginBottom: '1rem' }}>

              <strong>Dia y hora: {game.reservation.date} - {game.reservation.schedule.schedule}:00hs</strong>
              <br />
              Cancha: {game.reservation.fieldType.field_type}
              <br />
              Estado: {game.reservation.state}
              <br />
              A nombre de: {game.userCreator.name}
              <br />
              <Button1 onClick={() => aceptarReserva(game.id)}>
                Aceptar
              </Button1>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PendingList;
