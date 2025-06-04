import React, { useEffect, useState, useContext } from "react";
import { AuthenticationContext } from "../../services/auth.context.jsx";
import PropertyItem from "./PropertyItem.jsx";
import {
  CardContainer,
  TittleCard,
  SubTittleCard,
  DatosCard,
} from "../../styles/Cards.jsx";

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
      <div className="flex flex-col items-center justify-center min-h-screen w-full">
        <p>Cargando propiedades...</p>
      </div>
    );
  if (error)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen w-full">
        <p className="text-red-500">{error}</p>
      </div>
    );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full">
      <div className={CardContainer}>
        <h2 className={TittleCard}>Lista de propiedades</h2>
        {properties.length === 0 ? (
          <p>No hay propiedades registradas.</p>
        ) : (
          <div className="flex flex-row items-center gap-12">
            {properties.map((property) => (
              <div key={property.id} className="mb-4">
                <PropertyItem property={property} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyList;
