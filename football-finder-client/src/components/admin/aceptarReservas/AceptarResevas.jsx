import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AceptarReservas = () => {
  const [pendientes, setPendientes] = useState([]);
  const [aceptadas, setAceptadas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [accionando, setAccionando] = useState(false);
  const token = localStorage.getItem('token');
  const propertyId = localStorage.getItem('propertyId');

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/properties/${propertyId}/games`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) throw new Error('Error al obtener reservas pendientes');
        const data = await res.json();
        setPendientes(data);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (propertyId && token) {
      fetchReservas();
    }
  }, [propertyId, token]);

  const aceptarReserva = async (rid) => {
    setAccionando(true);
    try {
      const res = await fetch(`http://localhost:8080/api/properties/${rid}/acepted`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
      if (!res.ok) throw new Error('No se pudo aceptar la reserva');

      const aceptada = pendientes.find(r => r.id === rid);
      if (aceptada) {
        setAceptadas(prev => [...prev, aceptada]);
        setPendientes(prev => prev.filter(r => r.id !== rid));
        toast.success('Reserva aceptada correctamente');
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setAccionando(false);
    }
  };

  if (loading) return <p>Cargando reservas...</p>;

  return (
    <div>
      <h2>Reservas Pendientes</h2>
      {pendientes.length === 0 ? (
        <p>No hay reservas pendientes</p>
      ) : (
        <ul>
          {pendientes.map((reserva) => (
            <li key={reserva.id} style={{ marginBottom: '1rem' }}>
              <strong>Partido:</strong> {reserva.name || 'Sin nombre'}<br />
              <strong>Fecha:</strong> {reserva.date ? new Date(reserva.date).toLocaleString() : 'Sin fecha'}<br />
              <strong>Estado:</strong> {reserva.state || 'pendiente'}<br />
              <button disabled={accionando} onClick={() => aceptarReserva(reserva.id)}>
                Aceptar
              </button>
            </li>
          ))}
        </ul>
      )}

      <h2>Reservas Aceptadas</h2>
      {aceptadas.length === 0 ? (
        <p>No hay reservas aceptadas</p>
      ) : (
        <ul>
          {aceptadas.map((reserva) => (
            <li key={reserva.id}>
              <strong>{reserva.name || 'Sin nombre'}</strong><br />
              Fecha: {reserva.date ? new Date(reserva.date).toLocaleString() : 'Sin fecha'}
            </li>
          ))}
        </ul>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default AceptarReservas;
