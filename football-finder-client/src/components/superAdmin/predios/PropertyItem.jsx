import React from "react";
import { inputStyle, colorStrong } from "../../styles/Cards.jsx";

function PropertyItem({ property }) {
  console.log(property);
  return (
    <div className="flex flex-col items-start justify-start w-full">
      <p className="text-lg text-blue-400 font-semibold mb-4">
        {property.name}
      </p>

      <p className={inputStyle}>
        <strong className={colorStrong}>Dirección:</strong> {property.adress}
      </p>

      <p className={inputStyle}>
        <strong className={colorStrong}>Horarios:</strong>{" "}
        {property.schedules.map((sch, index) => (
          <span key={index}>
            {sch.schedule} hs
            {index < property.schedules.length - 1 && " - "}
          </span>
        ))}
      </p>

      <p className={inputStyle}>
        <strong className={colorStrong}>Canchas:</strong>{" "}
        {property.fields.map((field, index) => (
          <span key={index}>
            {field.field_type}
            {index < property.fields.length - 1 && " - "}
          </span>
        ))}
      </p>
    </div>
  );
}

export default PropertyItem;
