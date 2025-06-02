import React, { useState, useEffect } from "react";

const CrearEditarPredio = ({ predioInicial, onGuardar, onEliminar }) => {
  const [nombre, setNombre] = useState("");
  const [ubicacion, setUbicacion] = useState("");

  // useEffect con dependencia: predioInicial
  useEffect(() => {
    if (predioInicial) {
      setNombre(predioInicial.nombre);
      setUbicacion(predioInicial.ubicacion);
    } else {
      setNombre("");
      setUbicacion("");
    }
  }, [predioInicial]);

  const handleGuardar = () => {
    const predio = {
      id: predioInicial?.id ?? Date.now(), // si no hay ID, generamos uno temporal
      nombre,
      ubicacion
    };
    onGuardar(predio);
  };

  const handleEliminar = () => {
    if (predioInicial) {
      const confirmar = window.confirm("¿Estás seguro que querés eliminar este predio?");
      if (confirmar) {
        onEliminar(predioInicial.id);
      }
    }
  };

  return (
    <div className="card">
      <h2>{predioInicial ? "Editar Predio" : "Crear Predio"}</h2>

      <label>Nombre:</label>
      <input
        type="text"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />

      <label>Ubicación:</label>
      <input
        type="text"
        value={ubicacion}
        onChange={(e) => setUbicacion(e.target.value)}
      />

      <button onClick={handleGuardar}>
        {predioInicial ? "Guardar Cambios" : "Crear Predio"}
      </button>

      {predioInicial && (
        <button onClick={handleEliminar} style={{ color: "red" }}>
          Eliminar Predio
        </button>
      )}
    </div>
  );
};

export default CrearEditarPredio;
