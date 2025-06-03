import React, { useEffect, useState, useContext } from 'react';
import { AuthenticationContext } from '../../services/auth.context.jsx';
import PropertyItem from './PropertyItem.jsx';

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { token } = useContext(AuthenticationContext)

  useEffect(() => {
    fetch('http://localhost:8080/api/properties', {
      headers: {
        Authorization: `Bearer ${token}`
      }})
      .then((res) => {
        if (!res.ok) {
          throw new Error('Error al obtener las canchas');
        }
        return res.json();
      })
      .then((data) => {
        setProperties(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error al cargar canchas:', err);
        setError('No se pudieron cargar las canchas.');
        setLoading(false);
      });
  }, []);
  if (loading) return <p>Cargando propiedades...</p>;
  if (error) return <p className="text-red-500">{error}</p>;


  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Lista de propiedades</h2>
      {properties.length === 0 ? (
        <p>No hay propiedades registradas.</p>
      ) : (
        <div className="properties-container pl-5">
          {properties.map((property) => (
            <div key={property.id} className="mb-2">
              <PropertyItem property={property}/>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PropertyList;
