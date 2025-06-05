import React from "react";
import styled from "styled-components";
import { useContext } from "react";
import { AuthenticationContext } from "../../services/auth.context.jsx";
import { errorToast, successToast } from "../../toast/NotificationToast.jsx";
import RedButton from "../../styles/RedButton.jsx";
import {
  CardContainer,
  TittleCard,
  inputStyle,
  colorStrong,
} from "../../styles/Cards.jsx";

const GameItem = ({ game }) => {
  const { token } = useContext(AuthenticationContext);

  const handleDelete = async () => {
    console.log("first");
    fetch(`http://localhost:8080/api/games/${game.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          errorToast("Failed to delete game");
          return;
        }
        successToast("Game deleted successfully");
        window.location.reload();
      })
      .catch((err) => {
        console.error("Error deleting game:", err);
      });
  };

  return (
    <div className="flex flex-col items-start justify-start w-full">
      <div className="flex flex-col w-full">
        <span className={TittleCard}>{game.userCreator.name}</span>
        <span className={inputStyle}>
          <strong className={inputStyle}>
            {game.reservation.fieldType.property.name}
          </strong>
        </span>
      </div>
      <div className="flex flex-col w-full">
        <p className={inputStyle}>
          <strong className={colorStrong}>Date:</strong>
          {game.reservation.date} - {game.reservation.schedule.schedule}
          hs
        </p>
        <p className={inputStyle}>
          <strong className={colorStrong}>Zone:</strong>
          {game.reservation.fieldType.property.zone}
        </p>
        <p className={inputStyle}>
          <strong className={colorStrong}>Adress:</strong>
          {game.reservation.fieldType.property.adress}
        </p>
      </div>
      <RedButton onClick={handleDelete}>Borrar</RedButton>
    </div>
  );
};

export default GameItem;
