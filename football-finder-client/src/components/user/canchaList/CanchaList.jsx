import React, { useEffect, useState } from 'react';

const CanchaList = () => {
  const [Schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/fields')
      .then(res => res.json())
      .then(data => {
        setSchedule(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error al cargar canchas:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Cargando canchas...</p>;

  return (
    <div>
      <h2>Lista de canchas</h2>
      {
        Schedule.length === 0 ? (
          <p>No hay canchas registradas.</p>
        ) : (
          <ul>
            {Schedule.map((s, index) => (
              <li key={index}>
                {s.field}
              </li>
            ))}
          </ul>
        )
      }
    </div>
  );
};

export default CanchaList;
