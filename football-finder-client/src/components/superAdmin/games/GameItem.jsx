import React, { useContext } from "react";
import { AuthenticationContext } from "../../services/auth.context.jsx";
import { errorToast, successToast } from "../../toast/NotificationToast.jsx";
import RedButton from "../../styles/RedButton.jsx";
import { TittleCard, inputStyle, colorStrong } from "../../styles/Cards.jsx";

import useConfirmModal from "../../../hooks/useConfirmModal";

const GameItem = ({ game }) => {
  const { token } = useContext(AuthenticationContext);
  const { Modal, show } = useConfirmModal();
  const handleDelete = () => {
    if (!token) {
      errorToast("No token found, please Log in");
      return;
    }

    show({
      title: "¿Estás seguro de que querés borrar este juego?",
      message: "Esta acción no se puede deshacer.",
      confirmText: "Borrar",
      cancelText: "Cancelar",
      onConfirm: async () => {
        try {
          const res = await fetch(
            `http://localhost:8080/api/games/${game.id}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (!res.ok) {
            throw new Error("Failed to delete game");
          }
          successToast("Game deleted successfully");
          window.location.reload();
        } catch (err) {
          console.error("Error deleting game:", err);
          errorToast(err.message || "Error deleting game");
        }
      },
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
          {game.reservation.date} - {game.reservation.schedule.schedule} hs
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

      <Modal />
    </div>
  );
};

export default GameItem;
