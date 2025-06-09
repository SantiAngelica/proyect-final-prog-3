import React, { useEffect, useState, useContext, use } from "react";
import { AuthenticationContext } from "../../services/auth.context.jsx";
import { ContainerStyle } from "../../styles/Container.jsx";
import Button1 from "../../styles/Button1.jsx";

import {
  CardContainer,
  TittleCard,
  inputStyle,
  colorStrong,
} from "../../styles/Cards.jsx";

function MyProperty({ setHasProperty }) {
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useContext(AuthenticationContext);
  useEffect(() => {
    fetch("http://localhost:8080/api/properties/my-property", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          if (res.status == 404) {
            setHasProperty(false);
            return null;
          }
          throw new Error("Error al obtener la propiedad");
        }

        return res.json();
      })
      .then((data) => {
        if (data) {
          setProperty(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message || "Error al cargar la propiedad");
      });
  }, [token]);

  if (loading)
    return (
      <div className={ContainerStyle}>
        <p>Cargando...</p>
      </div>
    );
  if (error)
    return (
      <div className={ContainerStyle}>
        <p className="text-red-500">{error}</p>
      </div>
    );

  console.log(property);

  return (
    <div className={ContainerStyle}>
      <div className={CardContainer}>
        <h2 className={TittleCard}>Datos de Mi Propiedad</h2>

        <div className="flex flex-col items-start w-full">
          <p className={inputStyle}>
            {" "}
            <strong className={colorStrong}>Nombre:</strong> {property.name}
          </p>
          <p className={inputStyle}>
            <strong className={colorStrong}>Direccion:</strong>{" "}
            {property.adress}
          </p>
          <p className={inputStyle}>
            <strong className={colorStrong}>Zona:</strong> {property.zone}
          </p>
          <p className={inputStyle}>
            <strong className={colorStrong}>Canchas:</strong>{" "}
            {property.fields.map((typf) => typf.field_type).join(" - ")}
          </p>
          <p className={inputStyle}>
            <strong className={colorStrong}>Horarios:</strong>{" "}
            {property.schedules.map((sch) => `${sch.schedule}hs`).join(" - ")}
          </p>
        </div>
        <Button1 className="mt-4">
          <a href={`/admin/update/${property.id}`}>Actualizar propiedad</a>
        </Button1>
      </div>
    </div>
  );
}

export default MyProperty;
