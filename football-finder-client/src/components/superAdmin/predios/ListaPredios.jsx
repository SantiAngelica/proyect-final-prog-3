import React, { useEffect, useState, useContext } from "react";
import { AuthenticationContext } from "../../services/auth.context";
import PropertyItem from "./PropertyItem";
import { ContainerStyle } from "../../styles/Container.jsx";
import { CardContainer, TittleCard } from "../../styles/Cards.jsx";

const ListaPredios = () => {
  const [predios, setPredios] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useContext(AuthenticationContext);

  useEffect(() => {
    const fetchPredios = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/properties", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("No se pudieron cargar los predios");

        const data = await res.json();
        setPredios(data);
      } catch (error) {
        console.error("Error al obtener predios:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPredios();
  }, []);

  if (loading)
    return (
      <div className={ContainerStyle}>
        <p>Cargando predios...</p>
      </div>
    );

  return (
    <div className={ContainerStyle}>
      <div className={CardContainer}>
        <h2 className={TittleCard}>Lista de Predios</h2>
        {predios.length === 0 ? (
          <p>No hay predios registrados.</p>
        ) : (
          <ul className="flex flex-col items-start justify-start w-full gap-6">
            {predios.map((predio) => (
              <li
                key={predio.id}
                className="flex flex-col items-start justify-start w-full border-2 border-gray-500 p-4 rounded-lg"
              >
                <PropertyItem property={predio} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ListaPredios;
