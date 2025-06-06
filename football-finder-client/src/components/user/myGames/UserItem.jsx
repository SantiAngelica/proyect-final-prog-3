import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthenticationContext } from "../../services/auth.context";
import { errorToast, successToast } from "../../toast/NotificationToast";
import Button from "../../styles/Button";
import { TittleCard, inputStyle, colorStrong } from "../../styles/Cards";
import useConfirmModal from "../../../hooks/useConfirmModal";

function UserItem({ user }) {
  const { gid } = useParams();
  const { token } = useContext(AuthenticationContext);
  const { show, Modal } = useConfirmModal();

  const handleInvite = () => {
    fetch(
      `http://localhost:8080/api/participations/invitation/${gid}/${user.id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => {
        if (!res.ok) {
          return res.json().then((data) => {
            throw new Error(data.message || "Error al obtener los partidos");
          });
        }
        successToast("¡Invitación enviada!");
      })
      .catch((err) => {
        console.log(err);
        errorToast(err.message || "Error al enviar la invitación");
      });
  };

  return (
    <div className="flex flex-col items-start w-full">
      <Modal />

      <p className={TittleCard}>{user.name}</p>
      <p className={inputStyle}>
        <strong className={colorStrong}>Posiciones:</strong>
        {user.positions.map((pos, index) => (
          <span key={index}>
            {pos.position}
            {index < user.positions.length - 1 ? ", " : ""}
          </span>
        ))}
      </p>
      <p className={inputStyle}>
        <strong className={colorStrong}>Canchas:</strong>
        {user.fieldsType.map((field, index) => (
          <span key={index}>
            {field.field}
            {index < user.fieldsType.length - 1 ? ", " : ""}
          </span>
        ))}
      </p>
      <p className={inputStyle}>
        <strong className={colorStrong}>Zona:</strong>
        {user.zone}
      </p>

      <Button
        onClick={() =>
          show({
            title: `¿Estás seguro que deseas invitar a ${user.name} a tu partido?`,
            message:
              "Se enviará una invitación al usuario para unirse al partido.",
            confirmText: "Invitar",
            cancelText: "Cancelar",
            onConfirm: handleInvite,
          })
        }
      >
        Invitar
      </Button>
    </div>
  );
}

export default UserItem;
