import React, { useEffect, useState, useContext } from "react";
import { AuthenticationContext } from "../../services/auth.context";
import PropertyItem from "./PropertyItem";

const ListaPredios = () => {
  const [predios, setPredios] = useState([]);
  const [loading, setLoading] = useState(true);

  const {token} = useContext(AuthenticationContext)
  useEffect(() => {
    const fetchPredios = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/properties",{
            headers: {
              Authorization: `Bearer ${token}`
            }
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


  if (loading) return <p>Cargando predios...</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Lista de Predios</h2>
      {predios.length === 0 ? (
        <p>No hay predios registrados.</p>
      ) : (
        <ul className="space-y-3">
          {predios.map((predio) => (
            <div
              key={predio.id}
              className="border p-4 rounded shadow-sm bg-white"
            >
              <PropertyItem property={predio} />
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListaPredios;

