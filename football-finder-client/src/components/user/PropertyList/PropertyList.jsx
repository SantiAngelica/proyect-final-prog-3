// PropertyList.jsx
import React, { useEffect, useState, useContext } from "react";
import { AuthenticationContext } from "../../services/auth.context.jsx";
import PropertyItem from "./PropertyItem.jsx";
import { CardContainer, TittleCard } from "../../styles/Cards.jsx";
import { ContainerStyle } from "../../styles/Container.jsx";

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { token } = useContext(AuthenticationContext);

  useEffect(() => {
    fetch("http://localhost:8080/api/properties", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error al obtener las canchas");
        }
        return res.json();
      })
      .then((data) => {
        setProperties(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al cargar canchas:", err);
        setError("No se pudieron cargar las canchas.");
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div className={ContainerStyle}>
        <p>Cargando propiedades...</p>
      </div>
    );
  if (error)
    return (
      <div className={ContainerStyle}>
        <p className="text-red-500">{error}</p>
      </div>
    );

  return (
    <div className={ContainerStyle}>
      <div className={CardContainer}>
        <h2 className={TittleCard}>Propiedades</h2>
        {properties.length > 0 ? (
          <ul className="flex flex-col items-start justify-start w-full gap-6">
            {properties.map((property) => (
              <li
                key={property.id}
                className="flex flex-col items-start justify-start w-full border-2 border-gray-500 p-4 rounded-lg"
              >
                <PropertyItem property={property} />
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay propiedades registradas.</p>
        )}
      </div>
    </div>
  );
};

export default PropertyList;
