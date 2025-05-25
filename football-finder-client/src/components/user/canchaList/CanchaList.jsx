import React, { useEffect, useState } from 'react';

const CanchaList = () => {
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/fields')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Error al obtener las canchas');
        }
        return res.json();
      })
      .then((data) => {
        setFields(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error al cargar canchas:', err);
        setError('No se pudieron cargar las canchas.');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Cargando canchas...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Lista de canchas</h2>
      {fields.length === 0 ? (
        <p>No hay canchas registradas.</p>
      ) : (
        <ul className="list-disc pl-5">
          {fields.map((field, index) => (
            <li key={index} className="mb-2">
              {field.field}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CanchaList;
