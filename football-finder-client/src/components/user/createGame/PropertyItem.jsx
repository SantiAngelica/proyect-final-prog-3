import { inputStyle, colorStrong } from "../../styles/Cards.jsx";

import Button1 from "../../styles/Button1.jsx";
import { FaArrowRight } from "react-icons/fa";

function PropertyItem({ property }) {
  return (
    <div className="flex flex-col items-start justify-start w-full">
      <p className="text-lg text-blue-400 font-semibold mb-4">
        {property.name}
      </p>
      <p className={inputStyle}>
        <strong className={colorStrong}>Zona:</strong> {property.zone}
      </p>
      <p className={inputStyle}>
        <strong className={colorStrong}>Dirección:</strong> {property.adress}
      </p>
      <p className={inputStyle}>
        <strong className={colorStrong}>Horarios:</strong>{" "}
        {property.schedules.map((sch) => `${sch.schedule} hs`).join(" - ")}
      </p>
      <p className={inputStyle}>
        <strong className={colorStrong}>Canchas disponibles:</strong>{" "}
        {property.fields.map((fld) => fld.field_type).join(" - ")}
      </p>
      <p className={inputStyle}>
        <Button1
          children={
            <a
              className="flex items-center"
              href={`/user/reservation/${property.id}`}
            >
              Ver disponibilidad <FaArrowRight className="ms-2" />
            </a>
          }
        />
      </p>
    </div>
  );
}

export default PropertyItem;
