import React from "react";
import { inputStyle, colorStrong } from "../../styles/Cards.jsx";

function AppItem({ app }) {
  return (
    <div className="flex flex-col items-start justify-start w-full">
      <p className={inputStyle}>
        <strong className={colorStrong}>Dia y hora:</strong>{" "}
        {app.gameApplied.reservation.date} -{" "}
        {app.gameApplied.reservation.schedule.schedule}hs
      </p>
      <p className={inputStyle}>
        <strong className={colorStrong}>Cancha:</strong>{" "}
        {app.gameApplied.reservation.schedule.property.zone} -{" "}
        {app.gameApplied.reservation.schedule.property.adress}
      </p>
      <p className={inputStyle}>
        <strong className={colorStrong}>Partido de:</strong>{" "}
        {app.gameApplied.userCreator.name}
      </p>
      <p className={inputStyle}>
        <strong className={colorStrong}>Estado:</strong> {app.state}
      </p>
    </div>
  );
}

export default AppItem;
