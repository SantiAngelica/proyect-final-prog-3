import React, { useEffect, useState } from "react";

const ListaPredios = () => {
  const [predios, setPredios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPredios = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/properties");
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
            <li
              key={predio.id}
              className="border p-4 rounded shadow-sm bg-white"
            >
              <p><strong>Nombre:</strong> {predio.name}</p>
              <p><strong>Dirección:</strong> {predio.address}</p>
              <p><strong>Teléfono:</strong> {predio.phone}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListaPredios;
