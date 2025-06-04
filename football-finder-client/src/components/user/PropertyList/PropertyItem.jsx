import React from "react";
import { inputStyle, colorStrong } from "../../styles/Cards.jsx";

function PropertyItem({ property }) {
  return (
    <div className="flex flex-col items-start justify-start w-full">
      <p className={inputStyle}>
        <strong className={colorStrong}>Nombre:</strong> {property.name}
      </p>
      <p className={inputStyle}>
        <strong className={colorStrong}>Zona:</strong> {property.zone}
      </p>
      <p className={inputStyle}>
        <strong className={colorStrong}>Dirección:</strong> {property.adress}
      </p>
      <p className={inputStyle}>
        <strong className={colorStrong}>Horarios disponibles:</strong>{" "}
        {property.schedules.map((sch) => sch.schedule).join(" - ")}
      </p>
      <p className={inputStyle}>
        <strong className={colorStrong}>Campos disponibles:</strong>{" "}
        {property.fields.map((fld) => fld.field_type).join(" - ")}
      </p>
    </div>
  );
}

export default PropertyItem;
