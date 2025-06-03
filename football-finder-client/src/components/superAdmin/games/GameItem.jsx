import React from "react";
import styled from "styled-components";
import { useContext } from "react";
import { AuthenticationContext } from "../../services/auth.context.jsx";
import { errorToast, successToast } from "../../toast/NotificationToast.jsx";
import RedButton from "../../styles/RedButton.jsx";
import {
  CardContainer,
  TittleCard,
  SubTittleCard,
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
    <div className={CardContainer}>
      <label className="flex flex-col">
        <span className={TittleCard}>{game.userCreator.name}</span>
        <span className={SubTittleCard}>
          {game.reservation.fieldType.property.name}
        </span>
      </label>
      <div className="flex flex-col text-center justify-center">
        <span className="mb-2">
          Date:{game.reservation.date} - {game.reservation.schedule.schedule}
          hs
        </span>
        <span className="mb-2">
          Zone:{game.reservation.fieldType.property.zone}
        </span>
        <span className="mb-2">
          Adress:{game.reservation.fieldType.property.adress}
        </span>
      </div>
      <RedButton onClick={handleDelete}>Borrar</RedButton>
    </div>
  );
};

export default GameItem;
